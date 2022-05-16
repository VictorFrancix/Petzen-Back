import express from "express";
import { validateToken } from "./../middlewares/authMiddleware.js";

import { sendSale, getSales } from "./../controllers/salesController.js";
import { validateSchema } from "./../middlewares/joiValidationMiddleware.js";
import salesSchema from "./../schemas/salesSchema.js";

const salesRouter = express.Router();

salesRouter.post(
    "/sales",
    validateToken,
    (req, res, next) => {
        validateSchema(req, res, next, salesSchema);
    },
    sendSale
);

salesRouter.get("/sales", validateToken, getSales);

export default salesRouter;
