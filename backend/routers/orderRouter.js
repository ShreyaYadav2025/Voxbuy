const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Validate order input
const validateOrder = async (orderData) => {
    const errors = [];

    // Check required user fields
    if (!orderData.user?.firstName) errors.push('First name is required');
    if (!orderData.user?.lastName) errors.push('Last name is required');
    if (!orderData.user?.email) errors.push('Email is required');
    if (!orderData.user?.phone) errors.push('Phone is required');

    // Check required shipping address fields
    if (!orderData.shippingAddress?.address) errors.push('Shipping address is required');
    if (!orderData.shippingAddress?.city) errors.push('City is required');
    if (!orderData.shippingAddress?.state) errors.push('State is required');
    if (!orderData.shippingAddress?.zipCode) errors.push('ZIP code is required');
    if (!orderData.shippingAddress?.country) errors.push('Country is required');

    // Validate items array
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
        errors.push('Order must contain at least one item');
    } else {
        // Check each item
        for (let i = 0; i < orderData.items.length; i++) {
            const item = orderData.items[i];
            if (!item.productId) errors.push(`Item ${i + 1}: Product ID is required`);
            if (!item.name) errors.push(`Item ${i + 1}: Name is required`);
            if (!item.price) errors.push(`Item ${i + 1}: Price is required`);
            if (!item.quantity) errors.push(`Item ${i + 1}: Quantity is required`);
            
            // Validate product existence and stock
            if (item.productId) {
                try {
                    const product = await Product.findById(item.productId);
                    if (!product) {
                        errors.push(`Item ${i + 1}: Product not found`);
                    } else if (product.stock < item.quantity) {
                        errors.push(`Item ${i + 1}: Insufficient stock (available: ${product.stock})`);
                    }
                } catch (error) {
                    errors.push(`Item ${i + 1}: Invalid product ID`);
                }
            }
        }
    }

    // Validate payment method
    if (!['cod', 'online', 'card'].includes(orderData.paymentMethod)) {
        errors.push('Invalid payment method. Must be one of: cod, online, card');
    }

    // Validate total amount
    if (!orderData.totalAmount || typeof orderData.totalAmount !== 'number') {
        errors.push('Total amount is required and must be a number');
    }

    return errors;
};

// Create new order
router.post('/add', async (req, res) => {
    try {
        // Validate the order
        const validationErrors = await validateOrder(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                error: 'Validation failed',
                details: validationErrors
            });
        }

        // Start a transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Create the order
            const order = await Order.create([req.body], { session });

            // Update product stock
            for (const item of req.body.items) {
                const product = await Product.findById(item.productId).session(session);
                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }
                
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product: ${product.name}`);
                }

                await Product.findByIdAndUpdate(
                    item.productId,
                    { $inc: { stock: -item.quantity } },
                    { session, new: true }
                );
            }

            // Commit the transaction
            await session.commitTransaction();
            res.status(201).json(order[0]);
        } catch (error) {
            // If anything fails, abort the transaction
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            error: 'Failed to create order',
            message: error.message
        });
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