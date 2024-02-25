import express from "express";
import {
  createCandidateData,
  getAllCandidate,
} from "../controllers/candidateController.js";

// Init Router
const router = express.Router();

// Create Routes
router.route("/").get(getAllCandidate).post(createCandidateData);

// Export Router
export default router;
