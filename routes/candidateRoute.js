import express from "express";
import {
  createCandidateData,
  deleteCandidateData,
  getAllCandidate,
} from "../controllers/candidateController.js";

// Init Router
const router = express.Router();

// Create Routes
router.route("/").get(getAllCandidate).post(createCandidateData);
router.route("/:id").delete(deleteCandidateData);

// Export Router
export default router;
