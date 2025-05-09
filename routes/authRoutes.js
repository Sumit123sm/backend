import express from 'express';
import { adminRegister, studentRegister, teacherRegister } from '../controllers/authController.js';

const router = express.Router();

router.post('/admin/signup', adminRegister);
router.post('/student/signup', studentRegister);
router.post('/teacher/signup', teacherRegister);

export default router;
