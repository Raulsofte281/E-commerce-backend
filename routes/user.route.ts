import { Router } from 'express'; 
import  userController  from '../controller/user.controller.js';
const userRouter = Router();

userRouter.post('/user', userController.createUser);

export default userRouter;