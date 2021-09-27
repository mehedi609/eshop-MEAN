import { Document, PopulatedDoc } from 'mongoose';
import { ICategory } from './category';

export interface IReview {
    avatar: string;
    name: string;
    review: string;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    richDescription: string;
    image?: string;
    images?: string[];
    brand: string;
    price: number;
    category: PopulatedDoc<ICategory & Document>;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews?: IReview[];
    isFeatured: boolean;
    dateCreated?: any;
}
