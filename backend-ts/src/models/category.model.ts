import { Schema, Model, model } from 'mongoose';
import { ICategory } from '../interfaces/category';

const categorySchema: Schema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
});

export const Category: Model<ICategory> = model<ICategory>(
    'Category',
    categorySchema
);
