const forgotPasswordTemplate = ({ name, otp }) => {
    const containerStyle = "font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #007bff; border-radius: 8px; background-color: #f0f8ff;";
    const headerStyle = "text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;";
    const headingStyle = "color: #007bff; font-size: 24px;";
    const bodyStyle = "font-size: 16px; margin-bottom: 25px;";
    const otpContainerStyle = "text-align: center; background-color: #e6f2ff; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px dashed #007bff;";
    const otpStyle = "font-size: 32px; font-weight: bold; color: #333; letter-spacing: 5px; display: inline-block;";
    const warningStyle = "color: #dc3545; font-weight: bold;";
    const footerStyle = "text-align: center; margin-top: 30px; font-size: 12px; color: #888;";
    
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Recuperação de Senha</title>
        </head>
        <body>
            <div style="${containerStyle}">
                
                <div style="${headerStyle}">
                    <h1 style="${headingStyle}">⚠️ Solicitação de Redefinição de Senha</h1>
                </div>

                <div style="${bodyStyle}">
                    <h2>Olá, ${name}.</h2>
                    <p>Recebemos uma solicitação para redefinir a senha da sua conta na Loja Virtual.</p>
                    <p>Utilize o código de segurança (OTP) abaixo na página de redefinição para confirmar sua identidade:</p>
                    
                    <div style="${otpContainerStyle}">
                        <span style="${otpStyle}">
                            ${otp}
                        </span>
                    </div>

                    <p style="${warningStyle}">Atenção: Por motivos de segurança, este código é válido por apenas 1 hora.</p>
                    <p>Se você não solicitou esta redefinição, por favor, ignore este e-mail. Sua senha atual permanecerá inalterada.</p>
                </div>

                <div style="${footerStyle}">
                    <p>Este é um e-mail automático. Nunca compartilhe este código com ninguém.</p>
                    <p>&copy; ${new Date().getFullYear()} Loja Virtual. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default forgotPasswordTemplate;