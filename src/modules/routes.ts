import { Application } from 'express';
import LoginRouter from './login/routes';
import ProductRouter from './product/routes';

export const registerRoutes = (app: Application) => {
    app.use('/login', LoginRouter);
    app.use('/product', ProductRouter);
};