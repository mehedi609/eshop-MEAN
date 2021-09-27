import { Schema, Model, model } from 'mongoose';
import { IProduct } from '../interfaces/product';

const productSchema: Schema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        richDescription: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        images: [
            {
                type: String,
            },
        ],
        brand: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 0,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255,
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        dateCreated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true,
});

export const Product: Model<IProduct> = model<IProduct>(
    'Product',
    productSchema
);
