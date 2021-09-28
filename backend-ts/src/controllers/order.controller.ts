import { Request, Response } from 'express';
import { IOrder } from '../interfaces/order';
import { Order } from '../models/order.model';
import { IOrderItem } from '../interfaces/order-item';
import { OrderItem } from '../models/order-item.model';
import { Document, PopulatedDoc } from 'mongoose';
import { IUser } from '../interfaces/user';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders: IOrder[] = await Order.find()
            .populate('user', 'name')
            .sort({ dateOrdered: -1 });
        return res.status(200).json(orders);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    const order: IOrder = await Order.findById(id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            select: 'quantity product',
            populate: {
                path: 'product',
                select: '-__v',
                populate: { path: 'category', select: 'name color icon' },
            },
        });

    try {
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order with given ID was not found!',
            });
        }

        return res.status(200).json(order);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const addOrder = async (req: Request, res: Response) => {
    const {
        orderItems,
        shippingAddress1,
        shippingAddress2,
        city,
        zip,
        country,
        phone,
        status,
        user,
    } = req.body;

    try {
        const orderItemsIds = await Promise.all(
            orderItems.map(async (item: IOrderItem) => {
                const newOrderItem: IOrderItem = new OrderItem({
                    quantity: item.quantity,
                    product: item.product,
                });

                const orderItem: IOrderItem = await newOrderItem.save();

                return orderItem.id;
            })
        );

        const newOrder: IOrder = new Order({
            orderItems: orderItemsIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            user,
        });

        const createdOrder: IOrder = await newOrder.save();

        if (!createdOrder) {
            return res
                .status(400)
                .json({ success: false, message: 'Order cannot be created!' });
        }

        return res.status(201).json(createdOrder);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
