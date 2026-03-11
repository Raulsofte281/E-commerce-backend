import { Router } from 'express'; 
import  userController  from '../controller/user.controller.js';
const userRouter = Router();

userRouter.get('/get_user/:id', userController.getUser);
userRouter.post('/user', userController.createUser);
userRouter.delete('/user/:id', userController.deleteUser);
userRouter.put('/user/update/:id', userController.updateUser)

export default userRouter;