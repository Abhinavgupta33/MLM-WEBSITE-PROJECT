const User    = require('../models/User');
const Meeting = require('../models/Meeting');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: { user: process.env.BREVO_USER, pass: process.env.BREVO_API_KEY }
});

// ─── Meeting page ─────────────────────────────────────────────────────────────
exports.ser_meeting = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { name, user_image } = await getUserCtx(uid);
        
        // Fetch all meetings created by this user
        const meetings = await Meeting.find({ createdBy: uid }).sort({ dateTime: -1 });
        
        // Calculate statistics
        const now = new Date();
        const stats = {
            total: meetings.length,
            upcoming: meetings.filter(m => m.dateTime > now && m.status === 'scheduled').length,
            completed: meetings.filter(m => m.status === 'completed').length,
            canceled: meetings.filter(m => m.status === 'canceled').length
        };

        res.render('meeting', { name, user_image, meetings, stats });
    } catch (error) {
        console.error('Error in ser_meeting:', error);
        res.render('error');
    }
};

// ─── Create meeting ───────────────────────────────────────────────────────────
exports.ser_create_meeting = async (req, res) => {
    try {
        const { title, dateTime, meetingMode, meetingPlatform, meetingLink, meetingAddress, meetingCategory, description } = req.body;
        const userId = req.user.user_id;

        if (!title || !dateTime || !meetingCategory) {
            return res.status(400).json({ success: false, message: 'Title, date/time, and category are required' });
        }

        const meetingData = { 
            title, 
            dateTime: new Date(dateTime), 
            meetingType: meetingMode || 'online', 
            category: meetingCategory, 
            description: description || '', 
            createdBy: userId, 
            status: 'scheduled' 
        };

        if (meetingData.meetingType === 'online') {
            meetingData.locationDetails = { 
                online: { 
                    platform: meetingPlatform || 'Generic', 
                    link: meetingLink || '' 
                } 
            };
        } else {
            meetingData.locationDetails = { 
                offline: { 
                    address: meetingAddress || 'TBD', 
                    coordinates: { type: 'Point', coordinates: [0, 0] } 
                } 
            };
        }

        const meeting = new Meeting(meetingData);
        await meeting.save();
        let users = await User.find({ parent_id: userId });
        
        const locationText = meeting.meetingType === 'online' 
            ? `Online via ${meeting.locationDetails.online.platform}` 
            : (meeting.locationDetails.offline ? meeting.locationDetails.offline.address : 'Offline');

        res.render('selectpeople', { 
            users, 
            meetingId: meeting._id, 
            currentUserId: userId, 
            meetingTitle: meeting.title, 
            meetingDateTime: meeting.dateTime.toLocaleString(),
            meetingType: meeting.meetingType,
            locationText: locationText,
            meetingLink: meeting.meetingType === 'online' ? meeting.locationDetails.online.link : null
        });
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.render('error', { message: 'Failed to create meeting' });
    }
};

// ─── Send invites ─────────────────────────────────────────────────────────────
exports.ser_send_invite = async (req, res) => {
    try {
        const { recipients, subject, message, meetingId } = req.body;
        if (!recipients || !Array.isArray(recipients)) return res.status(400).json({ success: false, error: 'Recipients must be an array' });

        const validEmails = recipients.filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
        if (validEmails.length === 0) return res.status(400).json({ success: false, error: 'No valid email addresses' });

        const mailOptions = { from: `"Meeting Scheduler" <gupta33abhi@gmail.com>`, bcc: validEmails, subject, html: message };
        const info = await transporter.sendMail(mailOptions);

        if (meetingId) {
            await Meeting.findByIdAndUpdate(meetingId, { $addToSet: { invitees: validEmails }, $set: { lastInvited: new Date() } }, { new: true });
        }

        res.status(200).json({ success: true, message: 'Invitations sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send invitations', details: error.message });
    }
};

// ─── Success meeting create ───────────────────────────────────────────────────
exports.ser_success_meeting_create = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { name, user_image } = await getUserCtx(uid);
        res.render('successmeetingcreate', { name, user_image });
    } catch {
        res.render('error');
    }
};
