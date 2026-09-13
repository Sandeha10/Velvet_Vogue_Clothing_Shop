import mongoose from 'mongoose'; 

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            selectedSize: { type: String, required: true },
            selectedColor: { type: String, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Paid' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema); 