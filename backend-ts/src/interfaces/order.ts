import { Document, PopulatedDoc } from 'mongoose';
import { IOrderItem } from './order-item';
import { IUser } from './user';

export interface IOrder extends Document {
    orderItems: PopulatedDoc<IOrderItem & Document>[];
    shippingAddress1: string;
    shippingAddress2?: string;
    city: string;
    zip: string;
    country: string;
    phone: string;
    status: string;
    totalPrice: number;
    user: PopulatedDoc<IUser & Document>;
    dateOrdered: any;
}
