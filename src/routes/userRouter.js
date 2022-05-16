import { Router } from 'express';
import { login, signUp, logout, getUser, editUser } from './../controllers/userController.js';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.get("/users", getUser);
userRouter.put("/users", editUser);
userRouter.delete("/logout", logout);


export default userRouter;