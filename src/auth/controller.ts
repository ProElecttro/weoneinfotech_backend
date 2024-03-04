import AppDataSource from "../config";
import User from "../entities/user";

import { generateAccessToken } from "../jwt/generatetoken";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config()

const login = async(req:any, res:any) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
        where: { email: req.body.email }
    });
    if (!user) {
        return res.send({ message: "User not found, Please Registered!" })
    }

    try {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.send({ message: "Invalid Credentials!, Please try again." });
        }

        const access_token = generateAccessToken(user);

        const id = user.user_id;

        return res.status(200).json({
            id,
            access_token,
            message: "User Logged In Successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const register = async (req:any, res:any) => {
    const userRepo = AppDataSource.getRepository(User);
    const emailCheck = await userRepo.findOne({
        where: { email: req.body.email },
    });
    if (emailCheck) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        let user: User = new User();
        user = { ...req.body };
        user.password = hashedPassword;

        const user_saved = await userRepo.save(user);
        const id = user_saved.user_id;

        const access_token = generateAccessToken(user);

        return res.status(200).json({
            id,
            access_token,
            message: "User Registered Successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const controller = {
    register,
    login
}

export default controller;