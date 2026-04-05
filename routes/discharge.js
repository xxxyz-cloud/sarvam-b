import express from 'express';
import { upload } from '../middleware/upload.js';
import { parseDischarge, extractTextFromImage, verifyMedicine, getPlan } from '../controllers/dischargeController.js';

const router = express.Router();
router.get('/plan/:patientId', getPlan);
router.post('/parse', parseDischarge);
router.post('/ocr', upload.single('image'), extractTextFromImage);
router.post('/verify-medicine', verifyMedicine);

export default router;