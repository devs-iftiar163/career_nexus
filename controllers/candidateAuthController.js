import asyncHandler from "express-async-handler";
import { createOTP, isEmail, isMobile } from "../helpers/helper.js";
import Candidate from "../models/Candidate.js";
import bcrypt from "bcrypt";
import { accountActivationEmail } from "../mails/candidateActivation.js";

/**
 * @description Candidate Register
 * @method post
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
