import { Router } from 'express';
import { login } from '../controllers/userController';

const userRouter = Router();

userRouter.post("/login", login);

export default userRouter;