import { Category } from '../models/category.model';
import { Request, Response } from 'express';
import { ICategory } from '../interfaces/category';

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories: ICategory[] = await Category.find();
        return res.json(categories);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const getCategory = async (req: Request, res: Response) => {
    try {
        const category: ICategory = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'The category with given ID was not found!',
            });
        }

        return res.status(200).json(category);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const addCategory = async (req: Request, res: Response) => {
    const { name, icon, color } = req.body;

    const newCategory: ICategory = new Category({
        name,
        icon,
        color,
    });

    try {
        const category: ICategory = await newCategory.save();

        if (!category) {
            return res.status(400).json('Category cannot be created!');
        }

        return res.status(201).json(category);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const { name, icon, color } = req.body;
    try {
        const updatedCategory: ICategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name,
                icon,
                color,
            },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category cannot be updated!',
            });
        }
        return res.status(200).json(updatedCategory);
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};

export const removeCategory = async (req: Request, res: Response) => {
    try {
        const category: ICategory = await Category.findByIdAndRemove(
            req.params.id
        );
        if (category) {
            return res
                .status(200)
                .json({ success: true, message: 'the category is deleted!' });
        } else {
            return res
                .status(404)
                .json({ success: false, message: 'category not found!' });
        }
    } catch (e) {
        return res.status(500).json({ success: false, error: e });
    }
};
