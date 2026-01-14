import { Router } from "express";
import auth from "../middleware/auth.js";
import { CreateProductController, GetProductController } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/create', auth, CreateProductController);
productRouter.post('/get', GetProductController);

export default productRouter;
