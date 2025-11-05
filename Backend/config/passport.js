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
    "jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Check if it's an author first
        const author = await prisma.author.findUnique({
          where: { id: jwt_payload.id },
          select: {
            id: true,
            fullName: true,
            username: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (author) {
          return done(null, { ...author, userType: "author" });
        }

        // If not author, check if it's a user
        const user = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
          select: {
            id: true,
            username: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        if (user) {
          return done(null, { ...user, userType: "user" });
        }

        return done(null, false);
      } catch (err) {
        console.error("JWT Authentication Error:", err);
        return done(err, false);
      }
    })
  );
};

export default passportConfig;
