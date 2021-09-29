import { Request, Response } from 'express';
import { IOrder } from '../interfaces/order';
import { Order } from '../models/order.model';
import { IOrderItem } from '../interfaces/order-item';
import { OrderItem } from '../models/order-item.model';
import { Product } from '../models/product.model';
import { IProduct } from '../interfaces/product';

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
        const orderItemsIds: string[] = await Promise.all(
            orderItems.map(async (item: IOrderItem) => {
                const newOrderItem: IOrderItem = new OrderItem({
                    quantity: item.quantity,
                    product: item.product,
                });

                const orderItem: IOrderItem = await newOrderItem.save();

                return orderItem.id;
            })
        );

        const totalPrices: number[] = await Promise.all(
            orderItems.map(async (item: IOrderItem) => {
                const product: IProduct = await Product.findById(item.product);
                return product.price * item.quantity;
            })
        );

        const totalPrice: string = totalPrices
            .reduce((a: number, b: number) => a + b, 0)
            .toString();

        const newOrder: IOrder = new Order({
            orderItems: orderItemsIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone,
            status,
            totalPrice: +Number.parseFloat(totalPrice).toFixed(2),
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

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const updatedOrder: IOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!updatedOrder) {
            return res
                .status(400)
                .json({ success: false, message: 'Order cannot be updated!' });
        }

        return res.status(201).json(updatedOrder);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const removeOrder = async (req: Request, res: Response) => {
    try {
        const removedOrder: IOrder = await Order.findByIdAndRemove(
            req.params.id
        );

        if (!removedOrder) {
            return res
                .status(400)
                .json({ success: false, message: 'Order cannot be removed!' });
        }

        await Promise.all(
            removedOrder.orderItems.map(async (id: string) => {
                await OrderItem.findByIdAndRemove(id);
            })
        );

        return res
            .status(200)
            .json({ success: true, message: 'order is deleted!' });
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getTotalSales = async (req: Request, res: Response) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalSales: { $sum: '$totalPrice' } } },
            { $project: { _id: 0, totalSales: 1 } },
        ]);

        if (!totalSales) {
            return res.status(400).json({
                success: false,
                message: 'Total Sales cannot be generated!',
            });
        }

        return res.status(201).json(totalSales.pop());
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getTotalOrderNumber = async (req: Request, res: Response) => {
    try {
        const orderCount = await Order.estimatedDocumentCount();

        return res.status(200).json({ orderCount });
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
