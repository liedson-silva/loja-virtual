import mongoose from 'mongoose';
import CartProductModel from '../models/cartproduct.model.js';
import OrderModel from '../models/order.model.js';

export const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId, subTotalAmt, totalAmt } = req.body;

        const cartItem = await CartProductModel.find({ userId }).populate('productId');
        if (cartItem.length === 0) {
            return res.status(400).json({
                message: 'Seu carrinho está vazio.',
                error: true,
                success: false
            });
        }

        const productDetails = cartItem.map(item => ({
            name: item.productId.name,
            image: item.productId.image,
        }));
        const orderId = new mongoose.Types.ObjectId();

        const payload = {
            userId: userId,
            orderId: orderId,
            productId: cartItem.map(item => item.productId._id),
            product_details: productDetails,
            delivery_address: addressId,
            subTotalAmt: subTotalAmt,
            totalAmt: totalAmt,
            payment_status: "PENDING"
        };
        const newOrder = new OrderModel(payload);
        const savedOrder = await newOrder.save();

        await CartProductModel.deleteMany({ userId });

        return res.json({
            message: 'Pedido criado com sucesso.',
            data: savedOrder,
            success: true,
            error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await OrderModel.find({ userId });

        return res.json({
            data: orders,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};