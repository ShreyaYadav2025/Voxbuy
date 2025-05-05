const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Create new order
router.post('/add', async (req, res) => {
    try {
        // Create the order
        const order = await Order.create(req.body);

        // Update product stock
        for (const item of req.body.items) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get order history by email
router.get('/history/:email', async (req, res) => {
    try {
        const orders = await Order.find({ 'user.email': req.params.email })
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ error: 'Failed to fetch order history' });
    }
});

// Get order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;