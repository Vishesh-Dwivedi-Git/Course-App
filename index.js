require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to the database successfully");
        app.listen(3000, () => {
            console.log("Listening on port 3000");
        });
    } catch (error) {
        console.error("Error connecting to the database", error);
    }
}

main();
