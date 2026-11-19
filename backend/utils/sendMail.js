
import nodemailer from "nodemailer";

const sendMail = async (email, otp) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error("Email credentials are missing in Render");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify Gmail connection
  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"HireHelper" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "HireHelper - OTP Verification",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Welcome to HireHelper!</h2>
        <p>Your email verification OTP is:</p>
        <h1 style="color: #2563eb; letter-spacing: 5px;">
          ${otp}
        </h1>
        <p>This OTP expires in 10 minutes.</p>
        <p>Please do not share this OTP with anyone.</p>
      </div>
    `,
  });

  console.log("OTP email sent:", info.messageId);

  return info;
};

export default sendMail;
