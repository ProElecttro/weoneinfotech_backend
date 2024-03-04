import User from "../entities/user";
import * as jwt from "jsonwebtoken";

export const generateAccessToken = (user: User) => {
    const id = user.user_id
    return jwt.sign(
        { id },
        process.env.TOKEN_SECRET || "",
        { expiresIn: "2h" },
    );
};
