import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageCloudinary from '../utils/uploadImageCloudinary.js';
import generatedOtp from '../utils/generatedOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';
import jwt from "jsonwebtoken";

export async function registerUserController(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            });
        };

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({
                message: "Já existe usuário com este e-mail.",
                error: true, success: false
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const payload = {
            name, email, password: hashPassword,
        };

        const newUser = new UserModel(payload);
        const save = await newUser.save();

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

        const verifyEmail = await sendEmail({
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
    };
};

export async function verifyEmailController(req, res) {
    try {
        const { code } = req.body;
        const user = await UserModel.findOne({ _id: code });
        if (!user) {
            return res.status(400).json({
                message: "Código de verificação inválido.",
                error: true, success: false
            });
        };

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
    };
};

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "#e6f2ff",
                error: true, success: false
            });
        };

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Usuário não encontrado!",
                error: true, success: false
            });
        };

        if (user.status !== "Active") {
            return res.status(400).json({
                message: "Login não ativado, entre em contato com seu administrador!",
                error: true, succes: false
            });
        };

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({
                message: "Senha incorreta",
                error: true, success: false
            });
        };

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.json({
            message: "Logado com sucesso",
            success: true, error: false, data: { accessToken, refreshToken }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function logoutController(req, res) {
    try {
        const userId = req.userId;

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };

        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refresh_token: ""
        });

        return res.json({
            message: "Saindo do sistema com segurança!",
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};


export async function uploadAvatar(req, res) {
    try {
        const userId = req.userId;
        const image = req.file;

        const upload = await uploadImageCloudinary(image)

        const updateAvatar = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        });

        return res.json({
            message: "Avatar atualizado!",
            success: true, error: false,
            data: { _id: userId, avatar: upload.url }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function updateUserDetails(req, res) {
    try {
        const userId = req.userId;
        const { name, email, mobile, password } = req.body;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
        };

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: password })
        });

        return res.json({
            message: "Usuário atualizado com sucesso!",
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "E-mail não foi encontrado!",
                error: true, success: false
            });
        };

        const otp = generatedOtp();
        const expireTime = new Date() + 60 * 60 * 1000;

        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString()
        });

        await sendEmail({
            sendTo: email,
            subject: "Esqueceu sua senha?",
            html: forgotPasswordTemplate({
                name: user.name,
                otp: otp
            })
        });

        return res.json({
            message: "Código otp enviado ao seu e-mail!",
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function verifyForgotPasswordOtp(req, res) {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos.",
                error: true, success: false
            });
        };

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "E-mail não foi encontrado!",
                error: true, success: false
            });
        };

        const currentTime = new Date().toISOString();
        if (user.forgot_password_expiry < currentTime) {
            return res.status(400).json({
                message: "Código otp expirado!",
                error: true, success: false
            });
        };

        if (user.forgot_password_otp !== otp) {
            return res.status(400).json({
                message: "Código otp inválido!",
                error: true, success: false
            });
        };

        const updateOtp = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        });

        return res.json({
            message: "Código otp verificado com sucesso!",
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function resetPassword(req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            return res.status(400).json({
                message: "Campos obrigatórios não preenchidos!",
                error: true, success: false
            });
        };

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "E-mail não foi encontrado!",
                error: true, success: false
            });
        };

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                message: "Nova senha e comfirmar nova senha deve ser iguais!",
                error: true, success: false
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const updatePassword = await UserModel.findByIdAndUpdate(user?._id, {
            password: hashPassword
        });

        return res.json({
            message: "Senha atualizada com sucesso!",
            success: true, error: false
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};

export async function refreshToken(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];
        if (!refreshToken) {
            return res.status(401).json({
                message: "Token inválido!",
                error: true, success: false
            });
        };

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifyToken) {
            return res.status(401).json({
                message: "Token expirado!",
                error: true, success: false
            });
        };

        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
        res.cookie('accessToken', newAccessToken, cookieOptions);

        return res.json({
            message: "Novo token de acesso gerado com sucesso!",
            success: true, error: false, data: { accessToken: newAccessToken }
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, success: false
        });
    };
};