import mongoose from "mongoose";

// Education Schema
const degreeSchema = mongoose.Schema({
  institute: {
    type: String,
    trim: true,
    default: null,
  },
  degreeName: {
    type: String,
    trim: true,
    default: null,
  },
  studyField: {
    type: String,
    trim: true,
    default: null,
  },
  passingYear: {
    type: String,
    trim: true,
    default: null,
  },
  gpa: {
    type: String,
    trim: true,
    default: null,
  },
  cgpa: {
    type: String,
    trim: true,
    default: null,
  },
});

// Previoud Job Schema
const jobExperience = mongoose.Schema({
  company: {
    type: String,
    trim: true,
    default: null,
  },
  position: {
    type: String,
    trim: true,
    default: null,
  },
  reponsibility: {
    type: String,
    trim: true,
    default: null,
  },
  join: {
    type: String,
    trim: true,
    default: null,
  },
  leave: {
    type: String,
    trim: true,
    default: null,
  },
});

// Candidate Schema
const candidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: null,
      trim: true,
    },
    cv: {
      type: String,
      default: null,
      trim: true,
    },
    presentAddress: {
      type: String,
      default: null,
      trim: true,
    },
    parmanentAddress: {
      type: String,
      default: null,
      trim: true,
    },
    jobExp: [jobExperience],
    education: [degreeSchema],
    role: {
      type: String,
      default: "candidate",
      enum: ["candidate", "employer", "admin"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Export Default
export default mongoose.model("Candidate", candidateSchema);
