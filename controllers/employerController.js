import asyncHandler from "express-async-handler";
import { isEmail, isMobile, strictPass } from "../helpers/helper.js";
import Employer from "../models/Employer.js";
import bcrypt from "bcrypt";

/**
 * @description Get Employer Data
 * @method GET
 * @route api/v1/employer
 * @access public
 */

export const getAllEmployer = asyncHandler(async (req, res) => {
  // Get All Employer
  const employers = await Employer.find();

  // Data Check if any

  if (employers.length === 0) {
    return res.status(404).json({ message: "No Data Found" });
  }

  // Final Response
  res.status(200).json({ message: "All Employers Data Loaded" });
});

/**
 * @description Get Single Employer Data
 * @method GET
 * @route api/v1/employer/:id
 * @access public
 */

export const getSingleEmployerData = asyncHandler(async (req, res) => {
  // Get Single Data
  const { id } = req.params;

  // Find Employers Data
  const singleEmployer = await Employer.findById(id);

  // Data Validation
  if (!singleEmployer) {
    return res.status(404).json({ message: "No Data Found" });
  }

  // Final Response For Employer
  res.status(200).json(singleEmployer);
});

/**
 * @description Get Single Employer Data
 * @method DELETE
 * @route api/v1/employer/:id
 * @access public
 */

export const deleteSingleEmployer = asyncHandler(async (req, res) => {
  // Get Employer Data
  const { id } = req.params;

  // Find Deleted Id
  const employer = await Employer.findByIdAndDelete(id);

  // Data Validation Check
  if (!employer) {
    return res.status(404).json({ message: "No Data Found" });
  }

  // Final Response
  res
    .status(200)
    .json({ employer, message: "Employer Data Delete Succesfull" });
});

/**
 * @description Get Single Employer Data
 * @method PUT/PATCH
 * @route api/v1/employer/:id
 * @access public
 */

export const updateSingleEmployer = asyncHandler(async (req, res) => {
  // Get Employer ID
  const { id } = req.params;

  // Get Updated Data
  const { name, email, phone, companyName } = req.body;

  // Update Candidate Data
  const updatedEmployer = await Employer.findByIdAndUpdate(
    id,
    { name, email, phone, companyName },
    { new: true }
  );

  // Response
  res
    .status(200)
    .json({ updatedEmployer, message: "Employer Data Updated Successfully" });
});

/**
 * @description Create Employer Data
 * @method POST
 * @route api/v1/employer
 * @access public
 */

export const createEmployerData = asyncHandler(async (req, res) => {
  // Get Data From Form
  const { name, email, phone, password, companyName } = req.body;

  //   Form Validation
  if (!name || !email || !phone || !password || !companyName) {
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

  // Password Encrypt
  const hashPass = await bcrypt.hash(password, 10);

  //   Create New Candidate
  const employer = await Employer.create({
    name,
    email,
    phone,
    password: hashPass,
    companyName,
  });

  //   Response
  res.status(200).json({ employer, message: "Candidate Created Successfully" });
});
