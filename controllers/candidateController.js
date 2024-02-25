import asyncHandler from "express-async-handler";
import Candidate from "../models/Candidate.js";

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

  //   Create New Candidate
  const candidate = await Candidate.create({ name, email, phone, password });

  //   Response
  res
    .status(200)
    .json({ candidate, message: "Candidate Created Successfully" });
});
