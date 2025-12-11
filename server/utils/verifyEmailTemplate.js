const verifyEmailTemplate = ({ name, url }) => {
    const containerStyle = "font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;";
    const headerStyle = "text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;";
    const headingStyle = "color: #007bff; font-size: 24px;";
    const bodyStyle = "font-size: 16px; margin-bottom: 25px;";
    const buttonStyle = "display: inline-block; padding: 12px 25px; margin-top: 15px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px; text-align: center;";
    const footerStyle = "text-align: center; margin-top: 30px; font-size: 12px; color: #888;";
    
    return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verificação de E-mail</title>
        </head>
        <body>
            <div style="${containerStyle}">
                
                <div style="${headerStyle}">
                    <h1 style="${headingStyle}">🛍️ Loja Virtual</h1>
                </div>

                <div style="${bodyStyle}">
                    <h2>Boas-vindas, ${name}!</h2>
                    <p>Obrigado por se juntar à nossa comunidade.</p>
                    <p>Para ativar sua conta e começar a navegar em nossa loja, por favor, clique no botão abaixo para verificar seu endereço de e-mail:</p>
                    
                    <div style="text-align: center;">
                        <a href="${url}" style="${buttonStyle}">
                            Verificar Meu E-mail
                        </a>
                    </div>
                </div>

                <div style="${footerStyle}">
                    <p>Este é um e-mail automático, por favor, não responda.</p>
                    <p>&copy; ${new Date().getFullYear()} Loja Virtual. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

export default verifyEmailTemplate;