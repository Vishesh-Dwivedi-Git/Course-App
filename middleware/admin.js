const {JWT_ADMIN_SECRET}=require("../config");

function adminMiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(verify,JWT_USER_PASSWORD);
    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.status(403).json({
            "Message":"You are not signed in"
        });
    }
}

module.exports={
    adminMiddleware:adminMiddleware
}