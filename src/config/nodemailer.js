const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP
    }
})


// send mail with defined transport object
module.exports.sendMailToUser = async(userMail,token)=>{
    console.log(token);
    let info = await transporter.sendMail({
      from: "grupo2@hotmail.com",
      to: userMail,
      subject: "Verifica tu cuenta de correo electrónico",
      html: `<a href="http://javascript-production-974c.up.railway.app/user/confirmar/${token}">Clic para confirmar tu cuenta</a>`,
    });
    console.log("Message sent: %s", info.messageId);
}