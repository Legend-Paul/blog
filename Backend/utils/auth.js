import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import bcrypt from "bcrypt";

// Local Strategy for Login
const customFields = {
    usernameField: "username",
    passwordField: "password",
};

const localVerifyCallback = async (username, password, done) => {
    try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

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
