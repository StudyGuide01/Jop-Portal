import express from 'express'
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { upload } from '../middleware/multer.js';
const router = express.Router();

router.route('/register').post(upload.single('file'),register);
router.route('/login').post(login);
router.route('/logout').get(logout);
// router.route('/profile/update').post(isAuthenticated,updateProfile);
router.patch('/profile/update', isAuthenticated, upload.single('file'),updateProfile); // PATCH for partial updates



export default router