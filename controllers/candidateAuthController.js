import asyncHandler from "express-async-handler";
import {
  createOTP,
  isEmail,
  isMobile,
  tokenDecode,
} from "../helpers/helper.js";
import Candidate from "../models/Candidate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountActivationEmail } from "../mails/candidateActivation.js";

/**
 * @description Candidate Register
 * @method POST
 * @route api/v1/auth/candidate
 * @access public
 */
export const registerCandidate = asyncHandler(async (req, res) => {
  // Get Data
  const { name, auth, password } = req.body;

  // Empty Field Validation
  if (!name || !auth || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  //   Create OTP
  const otp = createOTP();

  // Check Email Or Phone
  let authEmail = null;
  let authPhone = null;

  // Check Validation
  if (isEmail(auth)) {
    authEmail = auth;

    // Check Email Existence
    const checkEmail = await Candidate.findOne({ email: auth });
    if (checkEmail) {
      return res.status(400).json({ message: "Email Already Exist" });
    }
  } else if (isMobile(auth)) {
    authPhone = auth;

    // Check Phone Existence
    const checkPhone = await Candidate.findOne({ phone: auth });
    if (checkPhone) {
      return res.status(400).json({ message: "Phone Already Exists" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You must use a valid Phone or Email address" });
  }

  //   Password Encryption
  const hashPass = await bcrypt.hash(password, 10);

  //   Register Candidate
  const candidate = await Candidate.create({
    name: name,
    email: authEmail,
    phone: authPhone,
    password: hashPass,
    accessToken: otp,
  });

  //   Send OTP to Authentication
  if (candidate) {
    // Send Token to Cookie
    const activationToken = jwt.sign(
      { auth },
      process.env.ACTIVATION_SECRET_CODE,
      { expiresIn: "15min" }
    );

    res.cookie("activationToken", activationToken);

    if (authEmail) {
      // Send OTP
      await accountActivationEmail(auth, { code: otp, link: "" });
    }
  }

  //   Response
  res
    .status(200)
    .json({ candidate, message: "Candidate Account Created Successfully" });
});

/**
 * @description Candidate Account Activation
 * @method POST
 * @route api/v1/auth/candidate-activation/:token
 * @access public
 */

export const candidateAccountActivation = asyncHandler(async (req, res) => {
  // Get Token
  const { token } = req.params;
  const { otp } = req.body;

  // Token Decode
  const activationToken = tokenDecode(token);

  // Verify Token

  const tokenVarify = jwt.verify(
    activationToken,
    process.env.ACTIVATION_SECRET_CODE
  );

  if (!tokenVarify) {
    return res.status(400).json({ message: " Invalid Token " });
  }

  // Activate Candidate
  let activateCandidate = null;

  if (isEmail(tokenVarify.auth)) {
    activateCandidate = await Candidate.findOne({ email: tokenVarify.auth });
    if (!activateCandidate) {
      return res.status(404).json({ message: "Email Not Found" });
    }
  } else if (isMobile(tokenVarify.auth)) {
    activateCandidate = await Candidate.findOne({ phone: tokenVarify.auth });
    if (!activateCandidate) {
      return res.status(404).json({ message: "Phone No Not Found" });
    }
  } else {
    return res.status(400).json({ message: "Invalid Candidate Account" });
  }

  // response
  res.status(200).json({ message: " Candidate selected Successfully " });
});
