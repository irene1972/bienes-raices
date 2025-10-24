import nodemailer from 'nodemailer';

const emailResetPassword=async (datos)=>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    });
    const {email,nombre,token}=datos;
    //enviar email
    const info=await transporter.sendMail({
        from:'Bienes Raices',
        to:email,
        subject:'Restablece tu password',
        text:'Restablece tu password',
        html:`
                <p>Hola: ${nombre}, has solicitado restablecer tu password</p>
                <p>Haz click en el siguiente enlace para generar un nuevo password:
                <a href="${process.env.FRONTEND_URL}/frontend/nuevo-password.html?token=${token}">Restablecer password</a></p>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
    });
    //console.log("Mensaje enviado: %s", info.messageId);
}

export default emailResetPassword;