import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: [{
        type: String, 
        required: true
    }],
    category: {
        type: String, 
        required: true
    },
    clothingType: {
        type: String, 
        required: true
    },
    sizes: [{
        type: String, 
        required: true
    }],
    colors: [{
        type: String, 
        required: true
    }],
    inStock: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;