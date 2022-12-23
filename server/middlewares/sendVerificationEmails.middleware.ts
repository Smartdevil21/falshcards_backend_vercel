import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

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
  userID: string;
  username: string;
}

export async function sendVerificationEmail({
  email,
  userID,
  username,
}: Props) {
  try {
    if (!userID) throw new Error("User doesnot exists!");
    const mailData = {
      from: "minimalist.ic@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: "Verification email!",
      text: "Verify your email!",
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
                <h3>おっす! どうですか。</h3>
                <h2>Thanks for signing up, <span style="color: #ff7d39;">${username}</span>!</h2>
                <p>Please verify your email to join the community and get access to the core features of the project by clicking the link below!</p>
                <br/>
                <a href='${process.env.DEPLOYED_URL}/user/verify-email?uid=${userID}'><button style="
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
      if (err) throw new Error("Error in sending verification email!");
      console.log("Verification email sent successfully!");
    });
    return { sent: true };
  } catch (error) {
    console.log(`Err in /user/verify-email : ${error}`);
    return { sent: false };
  }
}
