import { Router } from 'express';
import {
    addCategory,
    getAllCategories,
    removeCategory,
} from '../controllers/category.controller';

const router = Router();

router.route('/').get(getAllCategories).post(addCategory);

router.route('/:id').delete(removeCategory);

export const categoryRouter = router;
