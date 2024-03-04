import { Router } from "express";
import controller from "./controller";
import verifyJwt from "../middleware/fetchuser";

const productRoutes = Router();

productRoutes.get('/fetchProductDetails', controller.fetchProductDetails)
productRoutes.get('/productbycategory/:category', controller.productbycategory)

export default productRoutes;
