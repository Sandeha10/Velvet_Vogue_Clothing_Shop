import express from 'express';
const router = express.Router();
import Order from '../models/Order.js'; 
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Not authorized' });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET123');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token failed' });
    }
};

router.post('/create', protect, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const newOrder = new Order({
            userId: req.userId,
            items,
            totalAmount
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Order creation failed', error: error.message });
    }
});

router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

export default router;