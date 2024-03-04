import { Router } from "express";
import controller from "./controller";

const authRoute = Router()

authRoute.post('/register', controller.register)
authRoute.post('/login', controller.login)

export default authRoute;