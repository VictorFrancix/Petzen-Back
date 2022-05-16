import { Router } from 'express';
import { login, signUp, logout } from './../controllers/userController.js';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.delete("/logout", logout);


export default userRouter;