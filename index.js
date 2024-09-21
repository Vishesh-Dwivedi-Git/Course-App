const express=require("express");
const mongoose=require("mongoose");
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const app=express();

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main() {
    await mongoose.connect("mongodb+srv://23bcs135:vishesh1234@cluster0.k7wxd.mongodb.net/course-app");
    app.listen(3000);
    console.log("listening to the port 3000");
}


app.listen(3000);