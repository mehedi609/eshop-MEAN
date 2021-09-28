import { Router } from 'express';
import {
    addOrder,
    getAllOrders,
    getOrder,
} from '../controllers/order.controller';

const router = Router();

router.route('/').get(getAllOrders).post(addOrder);

router.route('/:id').get(getOrder);

export const orderRouter = router;
