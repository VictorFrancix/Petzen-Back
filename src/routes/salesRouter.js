import express from "express";
import { validateToken } from "./../middlewares/authMiddleware.js";

import {sendSale, getSales} from './../controllers/salesController.js';

const salesRouter = express.Router();

salesRouter.use(validateToken);

salesRouter.post("/sales", sendSale);

salesRouter.get("/sales", getSales);

export default salesRouter;