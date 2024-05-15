import { Router } from "express";
import { testProducts } from "../utils/constants.mjs";

const productRouter = Router();

productRouter.get(
    "/api/products", 
    (req, res) =>{
    // send a respose of user
    res.status(201).send(testProducts);
})

export default productRouter;