const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            service: process.env.MAIL_SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });
        // console.log("email sent sucessfully");
        return { success: true, message: "email sent sucessfully" };
    } catch (error) {
        // console.log(`error while sending email using nodemailer , ERROR:${error}`);
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = sendEmail;
