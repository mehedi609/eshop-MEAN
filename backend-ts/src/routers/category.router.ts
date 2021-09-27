import { Router } from 'express';
import {
    addCategory,
    getAllCategories,
    getCategory,
    removeCategory,
    updateCategory,
} from '../controllers/category.controller';

const router = Router();

router.route('/').get(getAllCategories).post(addCategory);

router
    .route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(removeCategory);

export const categoryRouter = router;
