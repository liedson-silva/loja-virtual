import { Router } from "express";
import auth from "../middleware/auth.js";

import {
    AddItemToCart,
    GetItemsInCart,
    RemoveItemFromCart,
    UpdateCartItem,
} from "../controllers/cartproduct.controller.js";

const cartProductRouter = Router();

cartProductRouter.post("/add-item-to-cart", auth, AddItemToCart);
cartProductRouter.get("/get-items-in-cart", auth, GetItemsInCart);
cartProductRouter.put("/update-cart-item", auth, UpdateCartItem);
cartProductRouter.delete("/delete-cart-item", auth, RemoveItemFromCart);

export default cartProductRouter