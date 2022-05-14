import express from "express";

import {sendSale, getSales} from './../controllers/salesController.js';

const salesRouter = express.Router();

salesRouter.post("/sales", sendSale);

salesRouter.get("/sales", getSales);

export default salesRouter;