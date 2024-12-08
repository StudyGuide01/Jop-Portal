import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { applyJob, getApplicant, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
const router = express.Router();

router.route('/applyJob/:id').get(isAuthenticated,applyJob); //job id 
router.route('/getAppliedJobs').get(isAuthenticated,getAppliedJobs);
router.route('/:id/getApplicant').get(isAuthenticated,getApplicant); //job id dena he 
router.route('/status/:id/updateStatus').post(isAuthenticated,updateStatus); //application id ayegi


export default router;
