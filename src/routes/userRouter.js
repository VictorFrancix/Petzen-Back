import { Router } from "express";
import { validateSchema } from "../middlewares/joiValidationMiddleware.js";
import {
    editUserSchema,
    loginSchema,
    signUpSchema,
} from "../schemas/userSchemas.js";
import {
    login,
    signUp,
    logout,
    getUser,
    editUser,
} from "./../controllers/userController.js";
import { validateToken } from "./../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post(
    "/login",
    (req, res, next) => {
        validateSchema(req, res, next, loginSchema);
    },
    login
);
userRouter.post(
    "/signup",
    (req, res, next) => {
        validateSchema(req, res, next, signUpSchema);
    },
    signUp
);
userRouter.get("/users", validateToken, getUser);
userRouter.put(
    "/users",
    (req, res, next) => {
        validateSchema(req, res, next, editUserSchema);
    },
    validateToken,
    editUser
);
userRouter.delete("/logout", validateToken, logout);

export default userRouter;
