const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const ctrl    = require('../controllers/index');

// ─── Public routes ────────────────────────────────────────────────────────────
router.get('/test_src', (req, res) => res.send('src/routes/index.js is active'));
router.get('/',                 ctrl.cont_landing);
router.get('/login',            ctrl.cont_login);
router.get('/signup_page',      ctrl.cont_signup_page);
router.post('/signup',          ctrl.cont_signup);
router.post('/loginrout',       ctrl.cont_loginrout);
router.post('/verifyotp',       ctrl.cont_verify_otp);

// ─── Protected routes ─────────────────────────────────────────────────────────
router.get('/register',         auth, ctrl.cont_register);
router.get('/adminprofile',     auth, ctrl.cont_adminprofile);
router.get('/viewuser',         auth, ctrl.cont_viewuser);
router.get('/user_register',    auth, ctrl.cont_adduserdata);
router.get('/dashboard',        auth, ctrl.cont_dashboard);
router.get('/userview',         auth, ctrl.cont_userview);
router.get('/adduser',          auth, ctrl.cont_adduser);
router.get('/opt_genrate',      auth, ctrl.cont_otp);
router.post('/change_pass',     auth, ctrl.cont_change_pass1);
router.get('/change_pass_page', auth, ctrl.cont_changepass);
router.post('/filteruser',      auth, ctrl.cont_filteruser);
router.post('/user_block',      auth, ctrl.cont_userblock);
router.post('/user_unblock',    auth, ctrl.cont_userunblock);
router.post('/user',            auth, ctrl.cont_userupdate);
router.post('/updatehello',     auth, ctrl.cont_update);
router.post('/delete_user',     auth, ctrl.cont_deleteuser);
router.post('/bulk_action',     auth, ctrl.cont_bulkaction);
router.get('/admininfo',        auth, ctrl.cont_admininfo);
router.get('/logout',           auth, ctrl.cont_logout);
router.get('/withdraw',         auth, ctrl.cont_withdraw);
router.get('/deposit',          auth, ctrl.cont_deposit);
router.post('/withdraw1',       auth, ctrl.cont_withdraw1);
router.post('/deposit1',        auth, ctrl.cont_deposit1);
router.post('/viewprofile',     auth, ctrl.cont_viewprofile);
router.get('/balance',          auth, ctrl.cont_balance);
router.get('/addproduct',       auth, ctrl.cont_addproduct);
router.get('/viewproduct',      auth, ctrl.cont_viewproduct);
router.get('/shopping',         auth, ctrl.cont_shopping);
router.get('/buynow',           auth, ctrl.cont_buynow);
router.post('/updatequantity',  auth, ctrl.cont_update_quantity);
router.get('/buynow1',          auth, ctrl.cont_buynow1);
router.get('/addtocart',        auth, ctrl.cont_addtocart);
router.post('/removeproduct',   auth, ctrl.cont_removeproduct);
router.post('/confirm_purchase',auth, ctrl.cont_confirm_purchase);
router.post('/confirm_purchase1',auth,ctrl.cont_confirm_purchase1);
router.get('/updateproduct',    auth, ctrl.cont_updateproduct);
router.get('/deleteproduct',    auth, ctrl.cont_deleteproduct);
router.post('/updateproductform',auth,ctrl.cont_updateproduct1);
router.get('/mail-open',        auth, ctrl.cont_mailopen);
router.get('/leaderboard',      auth, ctrl.cont_leaderboard);
router.get('/activity',         auth, ctrl.cont_activity);
router.get('/productedit',      auth, ctrl.cont_productedit);
router.get('/productdelete',    auth, ctrl.cont_productdelete);
router.post('/user_mail',       auth, ctrl.cont_user_mail);
router.post('/view_user_send_mail',auth,ctrl.cont_view_user_send_mail);
router.get('/meeting',          auth, ctrl.cont_meeting);
router.post('/create_meeting',  auth, ctrl.cont_create_meeting);
router.post('/send_invite',     auth, ctrl.cont_send_invite);
router.get('/successmeetingcreate',auth,ctrl.cont_success_meeting_create);

router.get('/settings',         auth, ctrl.cont_settings);
router.get('/notifications',    auth, ctrl.cont_notifications);
router.get('/messages',         auth, ctrl.cont_messages);
router.get('/team',             auth, ctrl.cont_team);
router.get('/help',             auth, ctrl.cont_help);
router.get('/feedback',         auth, ctrl.cont_feedback);

// ─── Header API Routes ────────────────────────────────────────────────────────
router.get('/api/search',        auth, ctrl.api_search);
router.get('/api/notifications', auth, ctrl.api_notifications);

module.exports = router;
