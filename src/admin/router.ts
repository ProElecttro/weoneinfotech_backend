import { Router } from "express";
import controller from "./controller";
import fetchuser from "../middleware/fetchuser";

const adminRoutes = Router();

adminRoutes.post('/addproduct', fetchuser, controller.addproduct)
adminRoutes.post('/deleteProduct/:product_id', fetchuser, controller.deleteProduct)

export default adminRoutes;
