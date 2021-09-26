import { Router } from 'express';
import { addProduct, getAllProducts } from '../controllers/product.controller';

const router = Router();

router.route('/').get(getAllProducts).post(addProduct);

router.route('/:id').delete();

export const productRouter = router;
