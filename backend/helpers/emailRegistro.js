import nodemailer from 'nodemailer';

const emailRegistro=async (datos)=>{
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
        subject:'Confirma tu cuenta en Bienes Raices',
        text:'Confirma tu cuenta en Bienes Raices',
        html:`
                <p>Hola: ${nombre}, confirma tu cuenta en Bienes Raices</p>
                <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/frontend/confirmar.html">Confirmar Cuenta</a></p>
                <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
            `
    });
    //console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro;