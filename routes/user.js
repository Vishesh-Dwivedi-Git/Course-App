const {Router}=require("express");
const userRouter=Router();

userRouter.post("/signup",function(req,res){

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

module.export={
    userRouter:userRouter
}

