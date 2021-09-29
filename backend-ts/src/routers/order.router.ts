import { Router } from 'express';
import {
    addOrder,
    getAllOrders,
    getOrder,
    getTotalOrderNumber,
    getTotalSales,
    removeOrder,
    updateOrderStatus,
} from '../controllers/order.controller';

const router = Router();

router.route('/').get(getAllOrders).post(addOrder);

router.route('/:id').get(getOrder).put(updateOrderStatus).delete(removeOrder);

router.route('/get/totalsales').get(getTotalSales);
router.route('/get/count').get(getTotalOrderNumber);

export const orderRouter = router;
