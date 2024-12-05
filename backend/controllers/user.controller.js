import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    console.log(req.body);
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing,please check!",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User is already exist,please try different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Enternal server error", success: false });
  }
};

//login api
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing please check!",
        success: false,
      });
    }

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    //check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: `Account dosen't exist with current role`,
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    const token = await jwt.sign(tokenData, process.env.USER_SECRET_KEY, {
      expiresIn: "1d",
    });

    //store token in cookies
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullName}`, success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//logout api
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logout successfully", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//update user profile api
// user.controller.js



// controller.js


export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // This will be the file sent from the client

    let cloudinaryResponse = null;

    // If a file is provided (resume or profile photo), upload to Cloudinary
    if (file) {
      const fileUri = getDataUri(file);
      cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const userId = req.id;
    let user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Prepare the skills array if it exists
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Update the user fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // If file (resume or profile photo) is provided, update the profile with the URL from Cloudinary
    if (cloudinaryResponse) {
     
        user.profile.resume = cloudinaryResponse.secure_url;
        user.profile.resumeOriginalName = file.originalname; // Store the original name of the resume
      
    }

    await user.save();

    // Format the updated user object to send back in the response
    const updatedUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



// export const updateProfile = async (req, res) => {
//   try {
//     const { fullName, email, phoneNumber, bio, skills } = req.body;

//     const file = req.file;

//     //cloudinary setup
//     const fileUri = getDataUri(file);
//     const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);


//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }

//     const userId = req.id;
//     let user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found.",
//         success: false,
//       });
//     }

//     // updating data
//     if (fullName) user.fullName = fullName;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     await user.save();

//     user = {
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res.status(200).json({
//       message: "Profile updated successfully.",
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: "internal server error", success: false });
//   }
// };
