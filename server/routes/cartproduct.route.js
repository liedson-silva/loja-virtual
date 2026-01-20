import { Router } from "express";
import auth from "../middleware/auth.js";

import {
    AddItemToCart,
    GetItemsInCart,
} from "../controllers/cartproduct.controller.js";

const cartProductRouter = Router();

cartProductRouter.post("/add-item-to-cart", auth, AddItemToCart);
cartProductRouter.get("/get-items-in-cart", GetItemsInCart);

export default cartProductRouter