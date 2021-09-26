import { Product } from '../models/product.model';
import { Request, Response } from 'express';
import { IProduct } from '../interfaces/product';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const { name, image, countInStock } = req.body;

    const newProduct = new Product({
        name,
        image,
        countInStock,
    });

    try {
        const product = await newProduct.save();
        res.json(product);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
