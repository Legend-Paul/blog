import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import prisma from "./prisma.js";
import dotenv from "dotenv";
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id,
            },
        });
        if (!user) return done(null, false);

        return done(null, user);
    } catch (err) {
        console.log(err);
        done(err, false);
    }
});

export default (passport) => {
    passport.use(strategy);
};
