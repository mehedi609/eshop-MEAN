import { Router } from 'express';
import {
    getAllUsers,
    getTotalUsers,
    getUserById,
    login,
    register,
    removeUser,
    updateUser,
} from '../controllers/users.controller';

const router = Router();

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById).put(updateUser).delete(removeUser);
router.route('/get/count').get(getTotalUsers);

router.route('/register').post(register);
router.route('/login').post(login);

export const userRouter = router;
