import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./prisma.js";
import dotenv from "dotenv";
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const passportConfig = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: jwt_payload.id },
                });

                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    return done(null, userWithoutPassword);
                }
                return done(null, false);
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );
};

export default passportConfig;
