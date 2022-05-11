import express, { json } from 'express';
import cors from 'cors';
import testRouter from './routes/testRouter.js';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(testRouter);

app.listen(process.env.PORT, () => console.log("Server running on port " + process.env.PORT));