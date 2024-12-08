import CompanyModel from "../models/company.model.js";
import getDataUri from '../utils/dataUri.js'
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(401).json({
        message: "something is missing please check!",
        success: false,
      });
    }

    let company = await CompanyModel.findOne({ companyName });
    if (company) {
      return res
        .status(401)
        .json({ message: "You can not registersame company", success: false });
    }

    company = await CompanyModel.create({
      companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "company registered successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Enternal server error", success: false });
  }
};

//get api

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //loged in user id
    const companies = await CompanyModel.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({companies,success:true});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Enternal Server Error", success: false });
  }
};

//get company by id

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({ success: true, company });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Enternal server error", success: false });
  }
};


//update company ( check company model )

export const updateCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    console.log(req.body);
    const file = req.file; // If using Cloudinary for image/file handling

    const fileUri = getDataUri(file);
    let cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    let logo = cloudinaryResponse.secure_url;
    // Prepare the updated data object
    let updateData = { companyName, description, website, location,logo };

    // Update the company document by ID
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    // Check if company exists
    if (!company) {
      return res.status(404).json({ message: 'Company not found', success: false });
    }

    return res.status(200).json({ message: 'Company information updated', success: true});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
};
