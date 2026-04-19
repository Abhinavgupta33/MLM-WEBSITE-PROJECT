const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOtp = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_API_KEY,
            },
        });

        await transporter.sendMail({
            from: `"NexusSphere" <gupta33abhi@gmail.com>`,
            to: email,
            subject: 'Your One-Time Password (OTP)',
            html: `
              <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #050a15; color: #ffffff; border-radius: 16px; overflow: hidden; position: relative;">
                <!-- Decorative Top Gradient -->
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 6px; background: linear-gradient(90deg, #3b82f6, #a855f7);"></div>
                
                <div style="text-align: center; margin-bottom: 30px; margin-top: 10px;">
                  <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: 1px; margin: 0;">NexusSphere</h1>
                  <p style="color: #94a3b8; font-size: 14px; margin-top: 5px; text-transform: uppercase; letter-spacing: 2px;">Identity Verification</p>
                </div>
                
                <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                  <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 25px; line-height: 1.6;">Hello,</p>
                  <p style="font-size: 16px; color: #cbd5e1; margin-bottom: 25px; line-height: 1.6;">A request was made to authenticate your session. Please use the highly secure One-Time Password below to gain access to the terminal.</p>
                  
                  <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1)); padding: 20px; border-radius: 8px; border: 1px solid rgba(59, 130, 246, 0.3); display: inline-block; min-width: 250px;">
                    <span style="font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #60a5fa; text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);">${otp}</span>
                  </div>
                  
                  <p style="font-size: 13px; color: #ef4444; margin-top: 25px; font-weight: 600;">⚠️ This secure key expires in 5 minutes. Do not share it.</p>
                </div>
                
                <div style="text-align: center; font-size: 12px; color: #475569; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
                  <p>If you did not initiate this request, please ignore this email or contact security immediately.</p>
                  <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} NexusSphere Elite Networks. All rights reserved.</p>
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
