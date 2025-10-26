import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./prisma";
import bcryptjs from "bcrypt";

// Local Strategy for Login
const customFields = {
    usernameField: "username",
    passwordField: "password",
};

const localVerifyCallback = async (username, password, done) => {
    try {
        // Find user by username
        const user = await prisma.user.findOne({ username });

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        // Check password
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
};
const localStrategy = new LocalStrategy(customFields, localVerifyCallback);
passport.use(localStrategy);

// JWT Strategy for Protected Routes
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
        try {
            const user = await User.findById(payload.id);

            if (user) {
                return done(null, user);
            }

            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    })
);

const generateToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
