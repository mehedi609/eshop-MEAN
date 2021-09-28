import { Document, PopulatedDoc } from 'mongoose';
import { IProduct } from './product';

export interface IOrderItem extends Document {
    quantity: number;
    product: PopulatedDoc<IProduct & Document>;
}
