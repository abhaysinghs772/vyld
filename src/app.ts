import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
dotenv.config();

/**
 * ROUTES
 */
import {
  authRoute,
  userRoute,
} from './routes';

/**
 * APP
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello world");
});

/** CONSUMING ROUTES */
app.use(authRoute, userRoute);

const uri = `mongodb+srv://${process.env.MONGO_USERID}:${process.env.MONGO_PASSWORD}@cluster0.ljrgvuv.mongodb.net/task_management?retryWrites=true&w=majority`

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

app.listen(3000, async () => {
    await connectDB();
    console.log(`server is up and running on port 3000`);
});
