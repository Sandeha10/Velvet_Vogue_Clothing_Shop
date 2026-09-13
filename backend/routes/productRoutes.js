import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        let query = {};

        const { category, clothingType, size, maxPrice, search } = req.query;

        // 1. Category Filter (Men, Women, Accessories)
        if (category) {
            query.category = category;
        }

        // 2. Clothing Type Filter 
        if (clothingType) {
            query.clothingType = clothingType;
        }

        // 3. Size Filter (S, M, L, XL)
        if (size) {
            query.sizes = size; 
        }

        // 4. Price Filter 
        if (maxPrice) {
            query.price = { $lte: Number(maxPrice) }; 
        }

        // 5. Search Bar Filter 
        if (search) {
            query.name = { $regex: search, $options: 'i' }; 
        }

        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

// 3. GET Route
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product details', error: error.message });
    }
});




export default router;