const nodemailer = require("nodemailer");

const SMTP_USER = process.env.SMTP_USER || "sureshgobi34@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS || "cmdmssbgqzqlfgsx";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
});

const sendVerificationEmail = (email, otp) => {
  const mailOptions = {
    from: "sureshgobi34@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Your account has been created successfully. In order to login, kindly verify your email address by clicking below button: http://localhost:3000/verify?token=${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Email Verification</h1>
        <p style="color: #666; font-size: 16px;">Your account has been created successfully.</p>
        <p style="color: #666; font-size: 16px;">In order to complete your registration, please verify your email address by clicking the button below:</p>
        <a href="http://127.0.0.1:5173/sign-up/verify/${otp}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; font-size: 18px; border-radius: 5px; margin-top: 20px;">Verify Email</a>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendVerificationEmail };