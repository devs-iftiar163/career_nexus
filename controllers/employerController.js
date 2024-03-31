import asyncHandler from "express-async-handler";
import { isEmail, isMobile, strictPass } from "../helpers/helper.js";
import Employer from "../models/Employer.js";

/**
 * @description Create Employer Data
 * @method POST
 * @route api/v1/employer
 * @access public
 */

export const createEmployerData = asyncHandler(async (req, res) => {
  // Get Data From Form
  const { name, email, phone, password } = req.body;

  //   Form Validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All Fields Are Required" });
  }

  // Check Valid Email Address
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid Email Address" });
  }

  // Check Phone Number
  if (!isMobile(phone)) {
    return res.status(400).json({ message: "Invalid Phone Number" });
  }

  // Password Validation
  if (!strictPass(password)) {
    return res.status(400).json({
      message:
        " Password Must Contain Uppercase Lowercase Character and Number ",
    });
  }

  // Check email Existence
  const checkEmail = await Employer.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "Email Already Exists" });
  }

  // Check Phone Existence
  const checkPhone = await Employer.findOne({ phone });
  if (checkPhone) {
    return res.status(400).json({ message: "Phone Already Exists" });
  }

  //   Create New Candidate
  const employer = await Employer.create({ name, email, phone, password });

  //   Response
  res.status(200).json({ employer, message: "Candidate Created Successfully" });
});
