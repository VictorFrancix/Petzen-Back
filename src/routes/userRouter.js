import { Router } from 'express';
import { login, signUp, getUser, editUser } from './../controllers/userController.js';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.get("/users", getUser);
userRouter.put("/users", editUser);


export default userRouter;