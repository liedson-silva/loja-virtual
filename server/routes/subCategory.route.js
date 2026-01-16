import { Router } from 'express'
import auth from '../middleware/auth.js';
import {
    AddSubCategoryController,
    DeleteSubCategoryController,
    getSubCategoryController,
    UpdateSubCategoryController
} from '../controllers/subCategory.controller.js';

const SubCategoryRouter = Router();

SubCategoryRouter.post('/create', auth, AddSubCategoryController);
SubCategoryRouter.get('/get', getSubCategoryController);
SubCategoryRouter.put('/update', auth, UpdateSubCategoryController);
SubCategoryRouter.delete('/delete', auth, DeleteSubCategoryController);

export default SubCategoryRouter;
