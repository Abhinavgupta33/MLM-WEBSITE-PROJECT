const User     = require('../models/User');
const Activity = require('../models/Activity');

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── Activity log ─────────────────────────────────────────────────────────────
exports.ser_activity = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let recent_activity = await Activity.find({ user_id: uid });
    res.render('activity', { name, user_image, recent_activity });
};

// ─── Leaderboard ──────────────────────────────────────────────────────────────
exports.ser_leaderboard = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('leaderboard', { name, user_image });
};
