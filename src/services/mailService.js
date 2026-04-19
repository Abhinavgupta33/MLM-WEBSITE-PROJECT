const User     = require('../models/User');
const Activity = require('../models/Activity');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── Mail Page ────────────────────────────────────────────────────────────────
exports.ser_mailopen = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('mail', { name, user_image });
};

// ─── User mail page (compose with recipient) ──────────────────────────────────
exports.ser_user_mail = async (req, res) => {
    let uid = req.user.user_id;
    const { user_image } = await getUserCtx(uid);
    let sender = await User.findOne({ user_id: uid });
    let sender_mail_is = sender.email;
    let user_mail = req.body.email;
    res.render('viewuser_mail', { user_image, sender_mail_is, user_mail });
};

// ─── Send mail to user ────────────────────────────────────────────────────────
exports.ser_view_user_send_mail = async (req, res) => {
    const uid = req.user.user_id;
    const abhi = await User.findOne({ user_id: uid });
    const name = abhi.your_name;
    const user_image = abhi.picture;
    try {
        const { senderEmail, recipientEmail, subject, message } = req.body;
        const transporter = nodemailer.createTransport({ host: 'smtp-relay.brevo.com', port: 587, auth: { user: process.env.BREVO_USER, pass: process.env.BREVO_API_KEY } });
        await transporter.sendMail({ from: 'gupta33abhi@gmail.com', replyTo: senderEmail, to: recipientEmail, subject, text: message });
        await new Activity({ user_id: uid, activity: 'Mail Send Successfully' }).save();
        res.render('mailsuccess', { name, user_image });
    } catch (error) {
        console.error('Email send error:', error);
        res.render('mailsendfail', { name, user_image });
    }
};
