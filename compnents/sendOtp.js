const axios = require("axios");

const sendOtp = async (email, otp) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Your App Name", email: process.env.BREVO_USER },
        to: [{ email }],
        subject: "Your One-Time Password (OTP)",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #2c3e50; text-align: center;">Your One-Time Password</h2>
            <p style="font-size: 16px;">Your OTP is:</p>
            <div style="background-color: #f8f9fa; padding: 15px; text-align: center; margin: 20px 0; border-radius: 6px;">
              <span style="font-size: 24px; font-weight: bold;">${otp}</span>
            </div>
            <p style="font-size: 14px;">This code expires in 5 minutes. Do not share it.</p>
          </div>
        `
      },
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY   // ✅ correct header name
        }
      }
    );

    console.log("✅ OTP email sent via Brevo:", response.status);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error.response?.data || error.message);
    throw new Error("Failed to send OTP email");
  }
};

module.exports = sendOtp;
