import { Router } from "express";
import auth from "../middleware/auth.js";
import {
    CreateProductController,
    DeleteProductDetailsController,
    GetProductByCategoryAndSubCategoryController,
    GetProductByCategoryController,
    GetProductController,
    GetProductDetailsController,
    UpdateProductDetailsController
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.post('/create', auth, CreateProductController);
productRouter.post('/get', GetProductController);
productRouter.post('/get-product-by-category', GetProductByCategoryController);
productRouter.post('/get-product-by-category-and-subcategory', GetProductByCategoryAndSubCategoryController);
productRouter.post('/get-product-details', GetProductDetailsController);
productRouter.delete('/delete', auth, DeleteProductDetailsController);
productRouter.put('/update', auth, UpdateProductDetailsController);

export default productRouter;
