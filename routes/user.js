const {Router}=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const {z}=require("zod");
const {userModel} =require("../db");



userRouter.post("/signup",async function(req,res){
    //input validation 
    const requiredBody=z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(30),
        firstName:z.string().min(3).max(100),
        lastName:z.string().min(3).max(100),
    });
    const parsedDataWithSuccess=requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format",
            error:parsedDataWithSuccess.error
        })
        return;
    }
    const {email, password,firstName, lastName}=req.body;
    try{
    await userModel.create({
        email:email,
        password:password,
        firstName :firstName,
        lastName:lastName

    })
    res.send("You are signedUp");
    
}catch(e){
    console.log(e);
    res.status(500).send("internal server error");
}

})

userRouter.post("/signin",function(req,res){
    res.send("You are signedin");

})

userRouter.get("/purchases",function(req,res){
    res.json({
        message:"purchases DOne"
    });

})

module.exports={
    userRouter:userRouter
}

