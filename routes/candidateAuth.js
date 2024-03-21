import express from "express";
import {
  candidateAccountActivation,
  registerCandidate,
} from "../controllers/candidateAuthController.js";

// init Express
const router = express.Router();

// Create Router
router.post("/registercand", registerCandidate);
router.post("/candidate-activation/:token", candidateAccountActivation);

// Export Default
export default router;
