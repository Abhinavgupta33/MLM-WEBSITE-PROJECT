const User     = require('../models/User');
const Activity = require('../models/Activity');

let passwordcheck = 0;

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── Withdraw page ────────────────────────────────────────────────────────────
exports.ser_withdraw1 = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('withdraw', { passwordcheck, name, user_image });
};

// ─── Process withdrawal ───────────────────────────────────────────────────────
exports.ser_withdraw = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let a = req.body.amount;
    let b = req.body.password;
    let data = await User.findOne({ user_id: uid });
    let previous_amount = data.amount;
    let new_amount = previous_amount - a;

    if (data.blocked) return res.render('blockeduser', { name, user_image });
    if (previous_amount < a) return res.render('notbalance', { name, user_image });

    if (passwordcheck < 5) {
        if (data.password !== b) {
            passwordcheck++;
            res.render('withdraw', { passwordcheck, name, user_image });
            if (passwordcheck >= 5) {
                await User.updateOne({ user_id: uid }, { $set: { blocked: true } });
                res.render('passblocked', { name, user_image });
            }
        } else {
            passwordcheck = 0;
            await new Activity({ user_id: uid, activity: 'Withdrawal Successfully Done', activity_detail: 'User Have Successfully Withdrawn Amount' }).save();
            await User.updateOne({ user_id: uid }, { $set: { amount: new_amount } });
            res.render('successwithdraw', { name, user_image, a });
        }
    }
};

// ─── Deposit page ─────────────────────────────────────────────────────────────
exports.ser_deposit1 = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('deposit', { passwordcheck, name, user_image });
};

// ─── Process deposit ──────────────────────────────────────────────────────────
exports.ser_deposit = async (req, res) => {
    let uId = req.user.user_id;
    const { name, user_image } = await getUserCtx(uId);
    let a = req.body.amount;
    let b = req.body.password;
    let data = await User.findOne({ user_id: uId });
    let new_amount = parseInt(a) + parseInt(data.amount);

    if (data.blocked) return res.render('blockeduser', { name, user_image });

    if (passwordcheck < 5) {
        if (data.password !== b) {
            passwordcheck++;
            res.render('deposit', { passwordcheck, name, user_image });
            if (passwordcheck >= 5) {
                await User.updateOne({ user_id: uId }, { $set: { blocked: true } });
                res.render('passblocked', { name, user_image });
            }
        } else {
            passwordcheck = 0;
            await new Activity({ user_id: uId, activity: 'Deposited Successfully Done', activity_detail: 'User Have Successfully Deposited Amount' }).save();
            await User.updateOne({ user_id: uId }, { $set: { amount: new_amount } });
            res.render('successdeposit', { name, user_image });
        }
    }
};

// ─── Balance ──────────────────────────────────────────────────────────────────
exports.ser_balance = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let data = await User.findOne({ user_id: uid });
    res.render('balance', { data, name, user_image });
};

// ─── View Profile ─────────────────────────────────────────────────────────────
exports.ser_viewprofile = async (req, res) => {
    let uid = req.user.user_id;
    const { user_image } = await getUserCtx(uid);
    let email = req.body.id;
    let data = await User.findOne({ email });
    res.render('profileview', { data, user_image });
};
