import mongoose from 'mongoose';

//jo job apply karega kon si company me kiya or kisne kiya

const applicationSchema = new mongoose.Schema({
    job:{ //kon si job apply kar rha he 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{ //kon job apply kar rha he 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{timestamps:true});

const ApplicationModel = mongoose.model('Application',applicationSchema);
export default ApplicationModel;