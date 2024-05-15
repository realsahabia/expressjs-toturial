import { Router } from "express";
import { testProducts } from "../utils/constants.mjs";

const productRouter = Router();

productRouter.get(
    "/api/products", 
    (req, res) =>{
        console.log(req.headers.cookie);
        console.log(req.cookies);
        console.log(req.signedCookies.hello);

        if (req.signedCookies.hello && req.signedCookies.hello === "world")
            // send a respose of user
            return res.status(201).send(testProducts);
        return res.send("You need the correct cookie")
})

export default productRouter;