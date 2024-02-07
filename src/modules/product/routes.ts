import { Router } from 'express';
import { tokenMiddleware } from '../../middlewares/token';
import ProductController from './controller';

const router = Router();

router.get(
    '/',
    tokenMiddleware,
    ProductController.getAll
);

router.get(
    '/:id',
    tokenMiddleware,
    ProductController.getById
);

router.post(
    '/',
    tokenMiddleware,
    ProductController.insert
);

router.patch(
    '/:id',
    tokenMiddleware,
    ProductController.update
);

router.delete(
    '/:id',
    tokenMiddleware,
    ProductController.delete
);

export default router;