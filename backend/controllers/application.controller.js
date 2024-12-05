import ApplicationModel from "../models/application.model.js";
import JobModel from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // Ensure this is set by authentication middleware
    const { id: jobId } = req.params; // Extract jobId from route parameters

    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }

    // Check if the user has already applied for the job
    const existingApplication = await ApplicationModel.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(200).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if the job exists
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    //create a new application
    const newApplication = await ApplicationModel.create({
      job: jobId,
      applicant: userId,
    });

    // Create a new application
    // const application = await ApplicationModel.create({
    //   job: jobId,
    //   applicant: userId,
    // });

    //job model ke ander application ki ek array he usme is new appled application ko dalne ke liye

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "You have successfully applied for the job",
      success: true,
      // newApplication,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//get apply job (we job jo user apply karega)

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
  
    const application = await ApplicationModel.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      }); //we sari jobs jo mene apply ki he (ham ne nested populate use kara he kiyoki job model ke ander job ke ander ham company ko bhi add kare he )

        
    if (!application) {
      return res
        .status(404)
        .json({ message: "No Application", success: false });
    }

    return res.status(200).json({ success: true, application });

  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//get applicants (we user jo job apply karega us ko fetch karna )
//jab admin jo job post karta he usper dekhne ke liye ke kitne user ne apply kiya he is job per
//admin dekhega kitne user apply kiya he
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId).populate({
      path: "applications", //kiyo ki hamne job ke under application dala he or application me hame ne do logo ko populate karne ka model likha he ek user ko or dusra job ko (check model);
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant", //inside application model
      },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//update status

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res
        .status(401)
        .json({ message: "Status is required", success: false });
    }

    //find the application by application id

    const application = await ApplicationModel.findOne({ _id: applicationId });
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status update successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
