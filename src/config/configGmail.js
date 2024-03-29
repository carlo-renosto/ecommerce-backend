
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { config } from "./config.js";

export const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: config.gmail.account,
        pass: config.gmail.password
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
})

export const generateTokenEmail = (email, expireTime) => {
    const token = jwt.sign({email}, config.gmail.secretToken, {expiresIn: expireTime});

    return token;
};

export const verifyTokenEmail = (token) => {
    try {
        const info = jwt.verify(token, config.gmail.secretToken);

        return info.email;
    } 
    catch(error) {
        console.log(error.message);
        return null;
    }
};

export const sendPwChangeEmail = async(request, email, token) => {
    const domain = `${request.protocol}://${request.get('host')}`;
    const link = `${domain}/api/sessions/recover-form?token=${token}`;

    await transport.sendMail({
        from: "Ecommerce",
        to: email,
        subject: "Recuperacion de cuenta",
        html: `
            <p>Hola ${email}, haga clic aquí para recuperar su cuenta:</p>
            <a href="${link}">Recuperar</a>

            <p>Nota: Este es un mail de prueba.</p>
        `
    });
};

export const sendPdDeleteEmail = async(request, email, product) => {
    await transport.sendMail({
        from: "Ecommerce",
        to: email,
        subject: "Eliminación de producto",
        html: `
            <p>Hola ${email}, su producto ${product.title} (ID ${product._id}) ha sido eliminado.</p>

            <p>Nota: Este es un mail de prueba.</p>
        `
    });
}

export const sendAccDeleteEmail = async(request, email) => {
    await transport.sendMail({
        from: "Ecommerce",
        to: email,
        subject: "Eliminación de cuenta",
        html: `
            <p>Hola ${email}, su cuenta ha sido eliminada. Razón: Inactividad.</p>

            <p>Nota: Este es un mail de prueba.</p>
        `
    });
}