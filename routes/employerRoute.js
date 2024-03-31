import express from "express";
import { createEmployerData } from "../controllers/employerController.js";

// Init Express
const router = express.Router();

// Router
router.route("/").post(createEmployerData);

// Export Default
export default router;
