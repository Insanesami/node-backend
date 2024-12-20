import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from 'express'

dotenv.config({
    path: './env'
});

const app = express();

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("MONGO db connection failed !!!", error);
        process.exit(1);
    }
};

startServer();
