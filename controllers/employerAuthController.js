import asyncHandler from "express-async-handler";
import {
  createOTP,
  isEmail,
  isMobile,
  tokenDecode,
} from "../helpers/helper.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accountActivationEmail } from "../mails/candidateActivation.js";

/**
 * @description employer Register
 * @method POST
 * @route api/v1/auth/registeremployer
 * @access public
 */

export const registerEmployer = asyncHandler(async (req, res) => {
  // Get Data
  const { name, auth, password, companyName } = req.body;

  // Empty Field Validation
  if (!name || !auth || !password || !companyName) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  //   Create OTP
  const otp = createOTP();

  // Auth Email Or Phone Check
  let authEmail = null;
  let authPhone = null;

  // Email Validation Check
  if (isEmail(auth)) {
    authEmail = auth;

    // Email Existence Check
    const checkEmail = await Employer.findOne({ email: auth });
    if (checkEmail) {
      return res.status(400).json({ message: "Email Already Exists" });
    }
  } else if (isMobile(auth)) {
    authPhone = auth;

    // Mobile Existence Check
    const checkMobile = await Employer.findOne({ phone: auth });
    if (checkMobile) {
      return res.status(400).json({ message: "Phone Already Exists" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "You must use a valid phone or email Address" });
  }

  //   Encrypt Password
  const hashPass = await bcrypt.hash(password, 10);

  //   Register Employer
  const employer = await Employer.create({
    name: name,
    email: authEmail,
    phone: authPhone,
    password: hashPass,
    companyName,
    accessToken: otp,
  });

  //   Send OTP to authentication
  if (employer) {
    // Activation Token
    const activationToken = jwt.sign(
      { auth },
      process.env.ACTIVATION_SECRET_CODE,
      { expiresIn: "15min" }
    );

    res.cookie("activationToken", activationToken);

    // OTP Send
    if (authEmail) {
      await accountActivationEmail(auth, { code: otp, link: "" });
    }
  }

  //   Response
  res
    .status(200)
    .json({ employer, message: "Employer account created successfully" });
});

/**
 * @description Employer Account Activation
 * @method POST
 * @route api/v1/auth/employer-activation/:token
 * @access public
 */

export const employerAccountActivation = asyncHandler(async (req, res) => {
  // Get data
  const { token } = req.params;
  const { otp } = req.body;

  // Decode token
  const activationToken = tokenDecode(token);

  //   Verify Token
  const tokenVerify = jwt.verify(
    activationToken,
    process.env.ACTIVATION_SECRET_CODE
  );

  if (!tokenVerify) {
    return res.status(400).json({ message: "Invalid Token" });
  }

  //   Activate Employer
  let activateEmployer = null;

  if (isEmail(tokenVerify.auth)) {
    activateEmployer = await Employer.findOne({ email: tokenVerify.auth });
    // check Availablity
    if (!activateEmployer) {
      return res.status(404).json({ message: "Email Not Found" });
    }
  } else if (isMobile(tokenVerify.auth)) {
    activateEmployer = await Employer.findOne({ phone: tokenVerify.auth });
    // Check Availablity
    if (!activateEmployer) {
      return res.status(404).json({ message: "Phone Not Found" });
    }
  } else {
    return res.status(400).json({ message: " Invalid Employer Account " });
  }

  //   Check OTP
  if (otp !== activateEmployer.accessToken) {
    return res.status(404).json({ message: "OTP Doesn't Match" });
  }

  // Update Activate Employer Data
  activateEmployer.isActive = true;
  activateEmployer.accessToken = null;
  activateEmployer.save();

  // Clear Cookie
  res.clearCookie("activationToken");

  //   Response
  res
    .status(200)
    .json({ activateEmployer, message: "Employer Activation Successfull" });
});

/**
 * @description Employer Account Login
 * @method POST
 * @route api/v1/auth/employer-login
 * @access public
 */

export const employerLogin = asyncHandler(async (req, res) => {
  // Get Data
  const { auth, password } = req.body;

  // Field Validation
  if (!auth || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  //Check Employer Credentials Validity
  let loginEmployer = null;

  if (isEmail(auth)) {
    loginEmployer = await Employer.findOne({ email: auth });

    if (!loginEmployer) {
      return res.status(404).json({ message: "Employer Email Doesn't Match" });
    }
  } else if (isMobile(auth)) {
    loginEmployer = await Employer.findOne({ phone: auth });

    if (!loginEmployer) {
      return res.status(404).json({ message: "Employer Phone Doesn't Match" });
    }
  } else {
    return res.status(400).json({ message: "Employer Not Found" });
  }

  // Password Validity Check
  const passwordCheck = bcrypt.compareSync(password, loginEmployer.password);
  if (!passwordCheck) {
    return res.status(404).json({ message: "Invalid Password" });
  }

  //   Employer Login Token
  const accessToken = jwt.sign({ auth }, process.env.EMPLOYER_LOGIN_KEY, {
    expiresIn: "365d",
  });

  // Set Login Access Token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  //   Login Success Message
  res
    .status(200)
    .json({ employer: loginEmployer, message: "Employer Login Successfull." });
});

/**
 * @description Get Logged In Employer
 * @method GET
 * @route api/v1/auth/me-employer
 * @access private
 */

export const getLoggeinEmployer = asyncHandler(async (req, res) => {
  if (!req.loginEmployer) {
    res.status(400).json({ message: "Employer Not Logged In" });
  }

  res
    .status(200)
    .json({ auth: req.loginEmployer, message: " Employer Logged In " });
});

/**
 * @description Employer Account Logout
 * @method POST
 * @route api/v1/auth/employer-logout
 * @access private
 */

export const employerLogout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Employer Logged Out" });
});
