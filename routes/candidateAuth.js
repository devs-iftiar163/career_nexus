import express from "express";
import {
  candidateAccountActivation,
  candidateLogout,
  getLoggedInCandidate,
  loginCandidate,
  registerCandidate,
} from "../controllers/candidateAuthController.js";
import tokenVerify from "../middlewares/tokenVerify.js";

// init Express
const router = express.Router();

// Create Router
router.post("/registercand", registerCandidate);
router.post("/login", loginCandidate);
router.post("/logout", candidateLogout);
router.post("/candidate-activation/:token", candidateAccountActivation);
router.get("/me", tokenVerify, getLoggedInCandidate);

// Export Default
export default router;
