import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from './routes/user.routes.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env'
});

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Use the user routes
app.use("/api/v1/users", userRouter);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.log("MONGO db connection failed !!!", error);
        process.exit(1);
    }
};

startServer();

export { app };
