import { body } from "express-validator";

const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min: 6}).notEmpty().withMessage("Password should contain atleast 6 characters")
]