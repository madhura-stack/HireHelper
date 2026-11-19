
import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("EMAIL_USER or EMAIL_PASS is missing");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"HireHelper" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "HireHelper - OTP Verification",
    html: `
      <h2>HireHelper Email Verification</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });

  console.log("OTP email sent:", info.messageId);
  return info;
};

export default sendMail;
