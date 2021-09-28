import { Schema, Model, model } from 'mongoose';
import { IOrderItem } from '../interfaces/order-item';

const orderItemSchema: Schema = new Schema<IOrderItem>(
    {
        quantity: {
            type: Number,
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    { timestamps: true }
);

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
    virtuals: true,
});

export const OrderItem: Model<IOrderItem> = model<IOrderItem>(
    'OrderItem',
    orderItemSchema
);
