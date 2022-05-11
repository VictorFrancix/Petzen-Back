import { Router } from 'express';
import { test } from '../controllers/testController.js';

const testRouter = Router();

testRouter.post("/test", test);

export default testRouter;