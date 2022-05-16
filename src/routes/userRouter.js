import { Router } from 'express';
import { login, signUp, logout, getUser, editUser } from './../controllers/userController.js';
import { validateToken } from './../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.post("/login", login);
userRouter.post("/signup", signUp);
userRouter.get("/users", validateToken, getUser);
userRouter.put("/users", validateToken, editUser);
userRouter.delete("/logout", validateToken, logout);


export default userRouter;