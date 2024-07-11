import { hash } from "bcrypt"; //use to encrypt password by converting into hashcode before saving into backend
import user from "../models/user.js";

export const getAllUsers = async(req, res, next) => {
    try {
        const users = await user.find();
        return res.status(200).json({
            message: "OK",
            users,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

export const userSignup = async(req, res, next) => {
    try {
        const {name , email , password} = req.body;
        const hashedPassword = await hash(password , 10); //use of hash function
        const users = new user({name , email , password: hashedPassword});
        await users.save();
        return res.status(200).json({
            message: "User Created!",
            id: users._id.toString(),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};