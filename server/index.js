import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';

dotenv.config();

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import uploadRouter from './routes/upload.route.js';
import SubCategoryRouter from './routes/subCategory.route.js';
import productRouter from './routes/product.route.js';
import cartProductRouter from './routes/cartproduct.route.js';
import orderRouter from './routes/order.route.js';

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get('/', (req, res) => res.json({ message: 'Servidor comunicando' }));

app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/file', uploadRouter);
app.use('/subcategory', SubCategoryRouter);
app.use('/product', productRouter);
app.use('/cartproduct', cartProductRouter);
app.use('/order', orderRouter);

const PORT = 3000 || process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em 'http://localhost:${PORT}'`);
    });
});
