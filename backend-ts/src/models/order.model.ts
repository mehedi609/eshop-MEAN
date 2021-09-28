import { Schema, Model, model } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema: Schema = new Schema<IOrder>(
    {
        orderItems: [
            {
                type: Schema.Types.ObjectId,
                ref: 'OrderItem',
                required: true,
            },
        ],
        shippingAddress1: {
            type: String,
            required: true,
        },
        shippingAddress2: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: 'Pending',
        },
        totalPrice: {
            type: Number,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        dateOrdered: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

export const Order: Model<IOrder> = model<IOrder>('Order', orderSchema);
