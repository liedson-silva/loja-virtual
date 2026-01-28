import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    createOrder,
    getOrdersByUser
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/create-order", auth, createOrder);
orderRouter.get("/get-orders-by-user", auth, getOrdersByUser);

export default orderRouter