import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { IProduct } from '../interfaces/product';
import { ICategory } from '../interfaces/category';

export const getAllProducts = async (req: Request, res: Response) => {
    let filter = {};
    const categories = req.query.categories as string;
    if (categories) {
        filter = { category: categories.split(',') };
    }
    try {
        const products: IProduct[] = await Product.find(filter).populate(
            'category'
        );
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product: IProduct = await Product.findById(
            req.params.id
        ).populate('category');
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product with given ID was not found!',
            });
        }
        return res.status(200).json(product);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(404).json({
            success: false,
            message: 'You must provide a valid file!',
        });
    }

    const {
        name,
        description,
        richDescription,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        reviews,
        isFeatured,
    } = req.body;

    // return res.json(req.file);

    const existingCategory: ICategory = await Category.findById(category);
    if (!existingCategory) {
        return res.status(404).json({
            success: false,
            message: 'The category with given ID was not found!',
        });
    }

    const imageWithPath = `${req.protocol}://${req.get('host')}/${
        req.file.path
    }`;

    const newProduct: IProduct = new Product({
        name,
        description,
        richDescription,
        image: imageWithPath,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        reviews,
        isFeatured,
    });

    try {
        const product: IProduct = await newProduct.save();
        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product cannot be created!',
            });
        }
        return res.status(201).json(product);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Product ID!',
        });
    }

    const {
        name,
        description,
        richDescription,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        reviews,
        isFeatured,
    } = req.body;

    try {
        const product: IProduct = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product with given ID was not found!',
            });
        }

        const file = req.file;
        let imagePath: string;

        if (file) {
            imagePath = `${req.protocol}://${req.get('host')}/${file.path}`;
        } else {
            imagePath = product.image;
        }

        const categoryId: string = category ? category : product.category;

        const existingCategory: ICategory = await Category.findById(categoryId);
        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'The category with given ID was not found!',
            });
        }

        const updatedProduct: IProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                richDescription,
                image: imagePath,
                brand,
                price,
                category,
                countInStock,
                rating,
                numReviews,
                reviews,
                isFeatured,
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product cannot be updated!',
            });
        }
        return res.status(201).json(updatedProduct);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const removeProduct = async (req: Request, res: Response) => {
    try {
        const product: IProduct = await Product.findByIdAndRemove(
            req.params.id
        );
        if (product) {
            return res
                .status(200)
                .json({ success: true, message: 'the product is deleted!' });
        } else {
            return res
                .status(404)
                .json({ success: false, message: 'product not found!' });
        }
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const uploadGalleryImages = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Product ID!',
        });
    }

    const files = req.files as [];

    if (!files.length) {
        return res.status(404).json({
            success: false,
            message: 'You must provide a valid file or files!',
        });
    }

    const imagesWithPath = files?.map(
        (file: any) => `${req.protocol}://${req.get('host')}/${file.path}`
    );

    try {
        const updatedProduct: IProduct = await Product.findByIdAndUpdate(
            id,
            {
                images: imagesWithPath,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(400).json({
                success: false,
                message: 'Product cannot be updated!',
            });
        }

        return res.status(201).json(updatedProduct);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getTotalProductNumber = async (req: Request, res: Response) => {
    try {
        const productCount = await Product.estimatedDocumentCount();

        return res.status(200).json({ productCount });
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
    const count = req.params.count ? req.params.count : 0;
    try {
        const products: IProduct[] = await Product.find({
            isFeatured: true,
        }).limit(+count);

        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
