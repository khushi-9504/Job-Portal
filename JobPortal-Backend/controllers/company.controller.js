import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloud.js";
import getDataUri from "../utils/datauri.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already exists.",
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company created successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

//----------------------------- Get all companies ---------------------

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.id; //Logged user id
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(400).json({
        message: "No companies found.",
      });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error(error);
  }
};

//----------------------------- Get company by id ---------------------

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ company, success: true });
  } catch (error) {
    console.error(error);
  }
};

//-------------------------- Update company details ---------------------

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    let updateData = { name, description, website, location };
    // Check if a new file is provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url; // Update logo only if a new file is provided
    }
    // const file = req.file;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // const logo = cloudResponse.secure_url;

    // const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({
      message: "Company details updated successully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};
//Delete Admin Company
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find all jobs associated with this company
    const jobs = await Job.find({ company: companyId });

    if (jobs.length > 0) {
      // Extract job IDs
      const jobIds = jobs.map((job) => job._id);

      // Delete all applications related to those jobs
      await Application.deleteMany({ job: { $in: jobIds } });

      // Delete all jobs associated with the company
      await Job.deleteMany({ company: companyId });
    }

    const deletedCompany = await Company.findByIdAndDelete(companyId);

    if (!deletedCompany) {
      return res
        .status(404)
        .json({ message: "Company not found", status: false });
    }

    return res
      .status(200)
      .json({ message: "Company deleted successfully", status: true });
  } catch (error) {
    console.error("Server Error while deleting Company: ", error);
    return res.status(500).json({
      message: "Server Error while deleting Company",
      status: false,
    });
  }
};
