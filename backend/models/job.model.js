import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String, required: false }],
  salary: { type: Number, required: true },
  experienceLevel:{type:Number,required:true},
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  position: { type: Number, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  }, //relation between job and company
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
},{timestamps:true});

const JobModel = mongoose.model('Job',jobSchema);
export default JobModel