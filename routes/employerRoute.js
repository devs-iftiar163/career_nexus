import express from "express";
import {
  createEmployerData,
  deleteSingleEmployer,
  getAllEmployer,
  getSingleEmployerData,
  updateSingleEmployer,
} from "../controllers/employerController.js";

// Init Express
const router = express.Router();

// Router
router.route("/").post(createEmployerData).get(getAllEmployer);
router
  .route("/:id")
  .get(getSingleEmployerData)
  .delete(deleteSingleEmployer)
  .put(updateSingleEmployer)
  .patch(updateSingleEmployer);

// Export Default
export default router;
