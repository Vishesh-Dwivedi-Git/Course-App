const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userModel } = require("../db");
const JWT_USER_PASSWORD = "this is vishesh";
const bcrypt = require("bcrypt");

userRouter.post("/signup", async function (req, res) {
    // Input validation
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect format",
            error: parsedDataWithSuccess.error,
        });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use a higher salt rounds value for security
    try {
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        res.status(201).json({ message: "You are signed up" });
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal server error");
    }
});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found, please sign up." });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD);
        res.json({ token });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.get("/purchases", function (req, res) {
    res.json({
        message: "Purchases Done",
    });
});

module.exports = {
    userRouter: userRouter,
};
