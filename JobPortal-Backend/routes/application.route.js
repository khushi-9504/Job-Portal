import express from "express";
import authenticateToken from "../middleware/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
// import axios from "axios";

const router = express.Router();

// router.route("/apply/:id").post(authenticateToken, applyJob);
router.route("/apply/:id").get(authenticateToken, applyJob);
// router.post("/apply/:id", authenticateToken, applyJob);
router.route("/get").get(authenticateToken, getAppliedJobs);
router.route("/:id/applicants").get(authenticateToken, getApplicants);
router.route("/status/:id/update").post(authenticateToken, updateStatus);

// router.get('/application/download', authenticateToken, async (req, res) => {
//   const fileUrl = req.query.url;

//   if (!fileUrl) return res.status(400).json({ message: "No file URL provided" });

//   try {
//     // Use axios to fetch the file from Cloudinary or file storage
//     const response = await axios.get(fileUrl, {
//       responseType: "arraybuffer", // Important for binary data
//     });

//     // Set response headers
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `attachment; filename="resume.pdf"`);

//     // Send the file data to the client
//     res.send(response.data);
//   } catch (error) {
//     console.error("Error fetching the file:", error.message);
//     res.status(500).json({ message: "Failed to download the file" });
//   }
// });
export default router;
