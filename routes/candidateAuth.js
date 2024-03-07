import express from "express";
import { registerCandidate } from "../controllers/candidateAuthController.js";

// init Express
const router = express.Router();

// Create Router
router.post("/registercand", registerCandidate);

// Export Default
export default router;
