import { Router } from 'express';
import {
    addProduct,
    getAllProducts,
    getFeaturedProducts,
    getProduct,
    getTotalProductNumber,
    removeProduct,
    updateProduct,
    uploadGalleryImages,
} from '../controllers/product.controller';
import {
    uploadMultipleImages,
    uploadSingleImage,
} from '../helpers/multerConfig';

const router = Router();

router.route('/').get(getAllProducts).post(uploadSingleImage, addProduct);

router
    .route('/:id')
    .get(getProduct)
    .put(uploadSingleImage, updateProduct)
    .delete(removeProduct);

router.route('/get/count').get(getTotalProductNumber);
router.route('/get/featured/:count').get(getFeaturedProducts);
router
    .route('/gallery-images/:id')
    .put(uploadMultipleImages, uploadGalleryImages);

export const productRouter = router;
