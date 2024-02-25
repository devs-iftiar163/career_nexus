import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import candidateRoute from "./routes/candidateRoute.js";
import { mongodbConnection } from "./config/mongoDB.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Init Express
const app = express();

// Env Variable
dotenv.config();
const PORT = process.env.PORT || 9090;

// URL Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Folder
app.use(express.static("public"));

// Create Route
app.use("/api/v1/candidate", candidateRoute);

// Error Handler
app.use(errorHandler);

// Run Server
app.listen(PORT, () => {
  mongodbConnection();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
