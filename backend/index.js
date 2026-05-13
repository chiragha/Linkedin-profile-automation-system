import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import linkedinRoutes from "./routes/linkedinRoutes.js";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;
try {
   await  mongoose.connect(DB_URI)
    console.log("Connected to MongoDB")
} catch (error) {
    console.log(error)
}

app.use("/api/v1/linkedin", linkedinRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
