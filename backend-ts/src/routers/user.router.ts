import { Router } from 'express';

const router = Router();

router.route('/').get().post();

router.route('/:id').delete();

export const userRouter = router;
