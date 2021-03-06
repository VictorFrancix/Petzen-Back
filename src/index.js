import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import userRouter from './routes/userRouter.js';
import salesRouter from './routes/salesRouter.js';
import productsRouter from './routes/productsRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(userRouter);
app.use(salesRouter);
app.use(productsRouter);

app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT) 
);


