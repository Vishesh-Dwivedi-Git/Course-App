const {Router}=require("express")
const courseRouter=Router();
courseRouter.get("/purchase",function(req,res){

    res.json({
        message:"purchase"
    });


})

courseRouter.get("/preview",function(req,res){

    res.json({
        message:"preview"
    });


})

module.exports={
    courseRouter:courseRouter
}