import { Router } from "express";
import userRouter from "./users.mjs";
import productRouter from "./products.mjs";

const routes = Router();

routes.use(userRouter);
routes.use(productRouter);

export default routes;