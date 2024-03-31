import mongoose from "mongoose";

// Company Job Posting Schema
const postingJobs = mongoose.Schema({
  jobTitle: {
    type: String,
    trim: true,
    default: null,
  },
  jobLocation: {
    type: String,
    trim: true,
    default: null,
  },
  jobRemote: {
    type: String,
    trim: true,
    default: "On-Site",
    enum: ["Remote", "On-Site", "Hybride"],
  },
  jobType: {
    type: String,
    trim: true,
    default: "Full-Time",
    enum: ["Full-Time", "Part-Time", "Internship", "Contractual", "Temporary"],
  },
  jobCategory: {
    type: String,
    trim: true,
    default: null,
  },
  jobDescription: {
    type: String,
    trim: true,
    default: null,
  },
  jobQualification: {
    type: String,
    trim: true,
    default: null,
  },
  applyStart: {
    type: String,
    trim: true,
    default: null,
  },
  applyEnd: {
    type: String,
    trim: true,
    default: null,
  },
  requiredExperience: {
    type: String,
    trim: true,
    default: null,
  },
  careerLabel: {
    type: String,
    trim: true,
    default: null,
  },
  salaryRange: {
    type: String,
    trim: true,
    default: null,
  },
});

// Employer company Schema
const employerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    companyName: {
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
    companyLogo: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    establishedYear: {
      type: String,
      trim: true,
      default: null,
    },
    companyCategory: {
      type: String,
      trim: true,
      default: null,
    },
    employeeSize: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    companyLogo: {
      type: String,
      trim: true,
      default: null,
    },
    postedJob: [String],
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "employer",
      enum: ["candidate", "employer", "admin"],
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
export default mongoose.model("Employer", employerSchema);
