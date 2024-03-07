import asyncHandler from "express-async-handler";
import Candidate from "../models/Candidate.js";
import { isEmail, isMobile, strictPass } from "../helpers/helper.js";

/**
 * @description Get All Candidate
 * @method GET
 * @route api/v1/candidate
 * @access public
 */

export const getAllCandidate = asyncHandler(async (req, res) => {
  // Get All Candidate
  const candidates = await Candidate.find();

  // Check Data
  if (candidates.length === 0) {
    return res.status(400).json({ message: "No Data Found" });
  }

  res.status(200).json({ candidates, message: "Candidate Data Loaded" });
});

/**
 * @description Get Singular Candidate
 * @method GET
 * @route api/v1/candidate
 * @access public
 */
export const getSingleCandidate = asyncHandler(async (req, res) => {
  // Get Single Candidate
  const { id } = req.params;

  // Find Candidate Data
  const singleCandidate = await Candidate.findById(id);

  // Check ID validation
  if (!singleCandidate) {
    return res.status(400).json({ message: "No Candidate Found" });
  }

  // Response
  res.status(200).json(singleCandidate);
});

/**
 * @description Create Candidate Data
 * @method POST
 * @route api/v1/candidate
 * @access public
 */

export const createCandidateData = asyncHandler(async (req, res) => {
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
  const checkEmail = await Candidate.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ message: "Email Already Exists" });
  }

  // Check Phone Existence
  const checkPhone = await Candidate.findOne({ phone });
  if (checkPhone) {
    return res.status(400).json({ message: "Phone Already Exists" });
  }

  //   Create New Candidate
  const candidate = await Candidate.create({ name, email, phone, password });

  //   Response
  res
    .status(200)
    .json({ candidate, message: "Candidate Created Successfully" });
});

/**
 * @description Delete Candidate Data
 * @method DELETE
 * @route api/v1/candidate/:id
 * @access public
 */

export const deleteCandidateData = asyncHandler(async (req, res) => {
  // Find Candidate ID
  const { id } = req.params;

  // Delete Candidate
  const candidate = await Candidate.findByIdAndDelete(id);

  // Response
  res
    .status(200)
    .json({ candidate, message: "Candidate Data Delete Successfull" });
});

/**
 * @description Update Candidate Data
 * @method PUT/PATCH
 * @route api/v1/candidate/:id
 * @access public
 */
export const updateCandidateData = asyncHandler(async (req, res) => {
  // Get ID From Data
  const { id } = req.params;

  // Get Updated Data
  const { name, email, phone } = req.body;

  // Email Validation
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Invalid Email Address" });
  }

  // Phone Validation
  if (isMobile(phone)) {
    return res.status(400).json({ message: "Invalid Mobile No" });
  }

  // Update Candidate Data
  const candidateData = await Candidate.findByIdAndUpdate(
    id,
    { name, email, phone },
    { new: true }
  );

  // Response
  res.status(200).json({ candidateData, message: "User Data Updated" });
});
