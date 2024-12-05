import express from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJob, getJobById, postJob } from '../controllers/job.controller.js';
const router = express.Router();

router.route('/postJob').post(isAuthenticated,postJob);
router.route('/getAllJob').get(isAuthenticated,getAllJob);
router.route('/getJobById/:id').get(isAuthenticated,getJobById);
router.route('/getAdminJobs').get(isAuthenticated,getAdminJobs)
// router.route('/profile/update').post(isAuthenticated,updateProfile);



export default router