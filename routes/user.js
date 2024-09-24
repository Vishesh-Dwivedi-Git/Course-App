const {Router}=require("express");
const userRouter=Router();
const jwt=require("jsonwebtoken");
const {z}=require("zod");

userRouter.post("/signup",function(req,res){
    //input validation 
    const requiredBody=z.object({
        email:z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(30)
    });
    const parsedDataWithSuccess=requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format",
            error:parsedDataWithSuccess.error
        })
        return;
    }
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;

    res.send("You are signedUp");

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

