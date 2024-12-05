import JobModel from "../models/job.model.js";

//jop poster by (Admin)
export const postJob = async (req, res) => {
    try {
      const {
        title,
        description,
        requirements,
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        companyId,
      } = req.body;
  
      const userId = req.id; // Ensure this is set by middleware, e.g., from a token
  
      // Validate all required fields
      if (
        !title ||
        !description ||
        !salary ||
        !experienceLevel ||
        !location ||
        !jobType ||
        !position ||
        !companyId
      ) {
        return res.status(400).json({
          message: "Something is missing, please check!",
          success: false,
        });
      }
  
      // Handle optional `requirements` field safely
      const parsedRequirements = requirements
        ? requirements.split(",")
        : [];
  
      // Create a new job
      const job = await JobModel.create({
        title,
        description,
        requirements: parsedRequirements,
        salary: Number(salary),
        experienceLevel: Number(experienceLevel),
        location,
        jobType,
        position: Number(position),
        company: companyId,
        created_by: userId,
      });
  
      return res
        .status(201)
        .json({ message: "New job created successfully.", success: true, job });
    } catch (error) {
      console.error(error);
  
      // Handle validation errors from Mongoose
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: `Validation error: ${error.message}`,
          success: false,
        });
      }
  
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
  

export const getAllJob = async (req, res) => {
  try {
    //keyword jo ham api me question(?) mark ke bad likhte hw wo keyword hota he
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await JobModel.find(query).populate({
        path:'company' //yha per jo comapny path he wo req.body wala ayega (schema wala name ayega)

    }).sort({createdAt:-1});

    if (!jobs) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Enternal server error',success:false});
  }
};


// Get job by id (student ke liye)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};


//get all job for (Admin)

export const getAdminJobs = async(req, res)=>{
    try {
        const adminId = req.id;
        const jobs = await JobModel.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({message:'Job not found',success:false});

        }
        return res.status(200).json({jobs,success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Enternal server error',success:false});

    }
}