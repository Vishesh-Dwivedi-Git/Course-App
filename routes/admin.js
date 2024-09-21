const {Router}=require("express");
const {adminModel}=require("../db")
const adminRouter=Router();

adminRouter.post("/signup",function(req,res){

    res.send("You are signedUp");

})

adminRouter.post("signin",function(req,res){
    res.send("You are signedin");

})

adminRouter.get("purchases",function(req,res){
    res.json({
        message:"purchases DOne"
    });

})

module.export={
    adminRouter:adminRouter
}
