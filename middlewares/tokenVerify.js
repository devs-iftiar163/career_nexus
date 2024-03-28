import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { isEmail, isMobile } from "../helpers/helper.js";
import Candidate from "../models/Candidate.js";

// Token Verify Middleware
const tokenVerify = (req, res, next) => {
  // Get Access Token From Server
  const accessToken = req.cookies.accessToken;

  // Check Token
  if (!accessToken) {
    return res.status(400).json({ message: "Unauthorized Candidate" });
  }

  // Verify Token
  jwt.verify(
    accessToken,
    process.env.CANDIDATE_LOGIN_KEY,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      // Get Candidate data
      let me = null;

      if (isEmail(decode.auth)) {
        me = await Candidate.findOne({ email: decode.auth }).select(
          "-password"
        );
      } else if (isMobile(decode.auth)) {
        me = await Candidate.findOne({ phone: decode.auth }).select(
          "-password"
        );
      } else {
        return res.status(400).json({ message: "Invalid Authorization" });
      }

      req.loginCandidate = me;
      next();
    })
  );
};

// Export Default
export default tokenVerify;
