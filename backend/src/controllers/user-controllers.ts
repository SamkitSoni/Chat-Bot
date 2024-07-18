import { hash , compare } from "bcrypt"; //use to encrypt password by converting into hashcode before saving into backend
import user from "../models/user.js";
import { createToken } from "../utils/token.js";
import { COOKIE_NAME } from "../utils/constant.js";

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
        const existingUser = await user.findOne({email});
        if(existingUser){
            return res.status(401).send("User already exists");
        }
        const hashedPassword = await hash(password , 10); //use of hash function
        const users = new user({name , email , password: hashedPassword});
        await users.save();

        res.clearCookie(COOKIE_NAME , {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createToken(users._id.toString(), users.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token , {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({
            message: "User Created!",
            name: users.name,
            email: users.email,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

export const userLogin = async(req, res, next) => {
    try {
        const {email , password} = req.body;
        const users = await user.findOne({email});
        if(!users){
            return res.status(401).send("User not registered");
        }
        const passwordCorrect = await compare(password , users.password);
        if(!passwordCorrect){
            return res.status(401).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME , {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });

        const token = createToken(users._id.toString(), users.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie(COOKIE_NAME, token , {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({
            message: "OK",
            name: users.name,
            email: users.email
        })    
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

export const verifyUser = async(req, res, next) => {
    try {
        const users = await user.findById(res.locals.jwtData.id);
        if(!users){
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(users._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match");
        }

        return res.status(200).json({
            message: "OK",
            name: users.name,
            email: users.email
        })    
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

export const userLogout = async(req, res, next) => {
    try {
        const users = await user.findById(res.locals.jwtData.id);
        if(!users){
            return res.status(401).send("User not registered or Token malfunctioned");
        }

        if(users._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match");
        }

        res.clearCookie(COOKIE_NAME , {
            domain: "localhost",
            httpOnly: true,
            signed: true,
            path: "/",
        });

        return res.status(200).json({
            message: "OK",
            name: users.name,
            email: users.email
        })    
    } catch (error) {
        return res.status(500).json({
            message: "Error",
            cause: error.message,
        });
    }
};

