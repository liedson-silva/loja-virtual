import senderEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            });
        }

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({
                message: "Já existe usuário com este e-mail.",
                error: true, success: false
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            name, email, password: hashPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

        const verifyEmail = await senderEmail({
            sendTo: email,
            subject: "Bem-vindo à Loja Virtual!",
            html: verifyEmailTemplate({
                name,
                url: verifyEmailUrl
            })
        });

        return res.json({
            message: "Usuário registrado com sucesso!",
            data: save, error: false, success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({ _id: code });
        if (!user) {
            return res.status(400).json({
                message: "Código de verificação inválido.",
                error: true, success: false
            });
        }

        const updatedUser = await UserModel.findOne(
            { _id: code },
            { verify_email: true }
        );

        return res.json({
            message: "E-mail verificado com sucesso!",
            success: true, error: false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    }
}