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

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

export const Category: Model<ICategory> = model<ICategory>(
    'Category',
    categorySchema
);
