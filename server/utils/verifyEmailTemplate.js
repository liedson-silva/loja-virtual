const verifyEmailTemplate = ({ name, url }) => {
    return `
        <h1>Olá, ${name}!</h1>
        <p>Obrigado por se registrar em nossa loja virtual.</p>
        <a href=${url}>Clique aqui para verificar seu e-mail</a>
    `;
};
export default verifyEmailTemplate;