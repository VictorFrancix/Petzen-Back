import { Router } from 'express';
import { getProducts, getProduct } from "./../controllers/productsController.js";

const productsRouter = Router();

productsRouter.get("/products", getProducts);
productsRouter.get("/products/:productId", getProduct);

export default productsRouter;