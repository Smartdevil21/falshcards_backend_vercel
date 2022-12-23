const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: Number(process.env.SMTP_PORT), // true for 465, false for other ports
  host: process.env.SMTP_HOST,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: true,
});

interface Props {
  email: string;
  username?: string;
  uid: string;
}

export default async function sendRecoveryEmail({
  uid,
  email,
  username,
}: Props): Promise<{ sent: boolean }> {
  try {
    if (!uid) throw new Error("User doesnot exists!");
    const mailData = {
      from: "minimalist.ic@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "Recovery email!",
      text: "Click on the button below to reset your password!",
      // html: `<b>Hey there! </b><br> Click the link below to verify your email!<br/><a href='${process.env.DEPLOYED_URL}/user/verify-email?uid=${userID}'><button>Verify</button></a>`,
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
            <h2>Click the button below to reset your password!</h2>
                <a href='${process.env.CORS_ORIGIN}/password-recovery/recovery?uid=${uid}'><button style="
                background-color: #ff7d39;
                color: #fff;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(255, 125, 57, 0.5);
                cursor: pointer
            ">Verify</button></a>
            </body>
            </html>`,
    };
    await transporter.sendMail(mailData, (err: any, info: any) => {
      if (err) throw new Error("Error in sending recovery email!");
    });
    return { sent: true };
  } catch (error) {
    console.log(`Err in recovery email middleware: ${error}`);
    return { sent: false };
  }
}
