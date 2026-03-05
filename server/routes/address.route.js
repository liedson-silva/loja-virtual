import { Router } from "express";
import auth from "../middleware/auth.js";

import { CreateAddress, DeleteAddress, GetAddress } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post("/add-address", auth, CreateAddress)
addressRouter.get("/get-address", auth, GetAddress)
addressRouter.delete("/delete-address", auth, DeleteAddress)

export default addressRouter