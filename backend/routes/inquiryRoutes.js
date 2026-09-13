import express from 'express';
const router = express.Router();
import Inquiry from '../models/Inquiry.js';

router.post('/submit', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const newInquiry = new Inquiry({ name, email, subject, message });
        await newInquiry.save();
        
        res.status(201).json({ message: 'Inquiry submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error, failed to submit inquiry', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch inquiries', error: error.message });
    }
});

export default router;