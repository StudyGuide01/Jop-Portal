import express from 'express';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.route('/registerCompany').post(isAuthenticated,registerCompany)
router.route('/getCompany').get(isAuthenticated,getCompany)
router.route('/getCompanyById/:id').get(isAuthenticated,getCompanyById)
router.route('/updateCompany/:id').patch(isAuthenticated,upload.single("file"),updateCompany)

export default router;
