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

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get('/', (req, res) => res.json({ message: 'Servidor comunicando' }));

app.use('/', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);

const PORT = 3000 || process.env.PORT;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em 'http://localhost:${PORT}'`);
    });
});
