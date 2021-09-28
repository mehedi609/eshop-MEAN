import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    login,
    register,
    updateUser,
} from '../controllers/users.controller';

const router = Router();

router.route('/').get(getAllUsers);

router.route('/:id').get(getUserById).put(updateUser);

router.route('/register').post(register);
router.route('/login').post(login);

export const userRouter = router;
