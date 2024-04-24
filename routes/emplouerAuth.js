import express from "express";
import {
  employerAccountActivation,
  employerLogin,
  employerLogout,
  registerEmployer,
} from "../controllers/employerAuthController.js";

// Express init
const router = express.Router();

// Create Authentication Router
router.route("/registeremployer").post(registerEmployer);
router.post("/employer-activation/:token", employerAccountActivation);
router.post("/employer-login", employerLogin);
router.post("/employer-logout", employerLogout);
router.get("/me-employer"); //token verify baki ache

// Export default
export default router;
