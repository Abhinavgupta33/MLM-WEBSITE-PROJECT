const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"ChainCore" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your One-Time Password (OTP)',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                <h2 style="color: #2c3e50; text-align: center;">Your One-Time Password</h2>
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 16px;">Here is your OTP to complete your login:</p>
                <div style="background-color: #f8f9fa; padding: 15px; text-align: center; margin: 20px 0; border-radius: 6px;">
                  <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2c3e50;">${otp}</span>
                </div>
                <p style="font-size: 14px; color: #666;">This code expires in <strong>5 minutes</strong>. Do not share it with anyone.</p>
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e0e0e0; font-size: 13px; color: #7f8c8d;">
                  <p>Best regards,<br>ChainCore Team</p>
                </div>
              </div>
            `,
        });

        console.log('OTP email sent successfully to', email);
    } catch (error) {
        console.error('Error sending OTP email:', error.message);
        throw new Error('Failed to send OTP email');
    }
};

module.exports = sendOtp;
