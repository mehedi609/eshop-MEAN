import { Product } from '../models/product.model';
import { Request, Response } from 'express';
import { IProduct } from '../interfaces/product';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const products: IProduct[] = await Product.find();
        return res.status(200).json(products);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

