const { Router } = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken"); // Import jwt
const adminRouter = Router();
const JWT_ADMIN_SECRET = "admin is this";
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function (req, res) {
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
    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Use a higher salt rounds value for security
    try {
        await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        // Find the user
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Please sign up first" });
        }

        // Compare and generate token
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ id: user._id }, JWT_ADMIN_SECRET);
            res.json({ token });
        } else {
            return res.status(403).json({ message: "Incorrect credentials" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error encountered!" });
    }
});

//admin post course 
adminRouter.post("/course",adminMiddleware,async function(req,res){
    const adminId=req.userId;
    const {title,description, price,imageUrl, creatorId}=req.header;
    const course=await adminModel.create({
        title,
        description, 
        price,
        imageUrl,
        creatorId:adminId
    });
    res.json({
        message:"course created",
        courseId:course._id
    });

})

//updating the course 
adminRouter.put("/course", async function (req, res) {
    
    const course=await adminModel.findOne({
        cou
    })
    res.json({ message: "Purchases Done" });
});

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        "message":"get your content"
    })
})

module.exports = {
    adminRouter: adminRouter,
};
