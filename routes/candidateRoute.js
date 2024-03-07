import express from "express";
import {
  createCandidateData,
  deleteCandidateData,
  getAllCandidate,
  getSingleCandidate,
  updateCandidateData,
} from "../controllers/candidateController.js";

// Init Router
const router = express.Router();

// Create Routes
router.route("/").get(getAllCandidate).post(createCandidateData);
router
  .route("/:id")
  .delete(deleteCandidateData)
  .put(updateCandidateData)
  .patch(updateCandidateData)
  .get(getSingleCandidate);

// Export Router
export default router;
