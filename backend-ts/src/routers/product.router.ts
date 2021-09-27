import { Router } from 'express';
import {
    addProduct,
    getAllProducts,
    getFeaturedProducts,
    getProduct,
    getTotalProductNumber,
    removeProduct,
    updateProduct,
} from '../controllers/product.controller';

const router = Router();

router.route('/').get(getAllProducts).post(addProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(removeProduct);

router.route('/get/count').get(getTotalProductNumber);
router.route('/get/featured/:count').get(getFeaturedProducts);

export const productRouter = router;
