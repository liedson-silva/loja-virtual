import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
    console.log("Essa chave do resend do email não foi encontrada no .env");
}

const resend = new Resend(process.env.RESEND_API);

const senderEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'lojaVirtual <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        
        if (error) {
            return console.error({ error });
        }

        return data;

    } catch (error) {
        console.log("Erro ao enviar o email:", error);
    }
};

export default senderEmail;
