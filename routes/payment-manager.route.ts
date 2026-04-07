import { Router } from 'express'; 
const paymentRouter = Router();
import paymentManagerController from '../controller/payment-manager.controller.js';

paymentRouter.get("/payment/:id", paymentManagerController.getProduct);

export default paymentRouter;