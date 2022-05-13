import { Router } from 'express';
import { login, signUp } from '../controllers/userController';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);


export default userRouter;