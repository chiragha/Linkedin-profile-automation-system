import express from "express";
import { searchStudents } from "../controllers/linkedinController.js";

const router = express.Router();

router.post("/search", searchStudents);

export default router;