const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  // Choose Brevo for production (Render) and Gmail for local
  const transporter = nodemailer.createTransport(
    process.env.NODE_ENV === 'production'
      ? {
          host: "smtp-relay.brevo.com",
          port: 587,
          secure: false, // use TLS
          auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASS
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000
        }
      : {
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        }
  );

  const mailOptions = {
    from: `"Your App Name" <${process.env.BREVO_USER || process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2c3e50; text-align: center;">Your One-Time Password</h2>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">We received a request for authentication. Here is your OTP:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; margin: 20px 0; border-radius: 6px;">
          <span style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #2c3e50;">${otp}</span>
        </div>
        
        <p style="font-size: 16px;">This code will expire in <strong>5 minutes</strong>. Please do not share this OTP with anyone.</p>
        
        <p style="font-size: 16px;">If you didn't request this OTP, please ignore this email or contact support.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; font-size: 14px; color: #7f8c8d;">
          <p>Best regards,<br>Your App Team</p>
        </div>
      </div>
    `,
    text: `Your OTP is ${otp}. It will expire in 5 minutes. Please do not share this OTP with anyone.\n\nIf you didn't request this OTP, please ignore this email.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent successfully to:', email);
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = sendOtp;
