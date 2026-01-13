import {Router} from 'express'
import auth from '../middleware/auth.js';
import { AddSubCategoryController, getSubCategoryController } from '../controllers/subCategory.controller.js';

const SubCategoryRouter = Router();

SubCategoryRouter.post('/create', auth, AddSubCategoryController);
SubCategoryRouter.get('/get', auth, getSubCategoryController);

export default SubCategoryRouter;
