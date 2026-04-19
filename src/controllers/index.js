const auth     = require('../services/authService');
const user     = require('../services/userService');
const product  = require('../services/productService');
const cart     = require('../services/cartService');
const wallet   = require('../services/walletService');
const mail     = require('../services/mailService');
const meeting  = require('../services/meetingService');
const activity = require('../services/activityService');

// ─── Auth Controllers ─────────────────────────────────────────────────────────
exports.cont_landing        = (req, res) => res.render('landing_page');
exports.cont_login          = (req, res) => res.render('login');
exports.cont_signup_page    = (req, res) => res.render('signup');
exports.cont_signup         = (req, res) => auth.ser_signup(req, res);
exports.cont_loginrout      = (req, res) => auth.ser_login(req, res);
exports.cont_verify_otp     = (req, res) => auth.ser_verify_otp(req, res);
exports.cont_logout         = (req, res) => auth.ser_logout(req, res);
exports.cont_changepass     = (req, res) => auth.ser_change_pass_page(req, res);
exports.cont_change_pass1   = (req, res) => auth.ser_changepass(req, res);
exports.cont_otp            = (req, res) => res.render('success');
exports.cont_register       = (req, res) => res.render('register');

// ─── User Controllers ─────────────────────────────────────────────────────────
exports.cont_dashboard      = (req, res) => user.ser_dashboard(req, res);
exports.cont_adminprofile   = (req, res) => user.ser_admininfo(req, res);
exports.cont_admininfo      = (req, res) => user.ser_admininfo(req, res);
exports.cont_adduser        = (req, res) => user.ser_adduserview(req, res);
exports.cont_adduserdata    = (req, res) => user.ser_adduserdata(req, res);
exports.cont_userview       = (req, res) => user.ser_userview(req, res);
exports.cont_viewuser       = (req, res) => user.ser_userview(req, res);
exports.cont_filteruser     = (req, res) => user.ser_filter(req, res);
exports.cont_userblock      = (req, res) => user.ser_blockuser(req, res);
exports.cont_userunblock    = (req, res) => user.ser_unblockuser(req, res);
exports.cont_userupdate     = (req, res) => user.ser_user(req, res);
exports.cont_update         = (req, res) => user.ser_update(req, res);
exports.cont_deleteuser     = (req, res) => user.ser_deleteuser(req, res);
exports.cont_bulkaction     = (req, res) => user.ser_bulkaction(req, res);
exports.cont_viewprofile    = (req, res) => wallet.ser_viewprofile(req, res);

// ─── Product Controllers ──────────────────────────────────────────────────────
exports.cont_addproduct         = (req, res) => product.ser_addproductview(req, res);
exports.cont_viewproduct        = (req, res) => product.ser_viewproduct(req, res);
exports.cont_updateproduct      = (req, res) => product.ser_updateproductview(req, res);
exports.cont_updateproduct1     = (req, res) => product.ser_updateproduct(req, res);
exports.cont_deleteproduct      = (req, res) => product.ser_deleteproduct(req, res);
exports.cont_productedit        = (req, res) => product.ser_productedit(req, res);
exports.cont_producteditsuccess = (req, res) => product.ser_producteditsuccess(req, res);
exports.cont_productdelete      = (req, res) => product.ser_productdelete(req, res);

// ─── Cart Controllers ─────────────────────────────────────────────────────────
exports.cont_shopping         = (req, res) => cart.ser_shopping(req, res);
exports.cont_buynow           = (req, res) => cart.ser_buynow(req, res);
exports.cont_buynow1          = (req, res) => cart.ser_buynow1(req, res);
exports.cont_addtocart        = (req, res) => cart.ser_addtocart(req, res);
exports.cont_removeproduct    = (req, res) => cart.ser_removeproduct(req, res);
exports.cont_confirm_purchase = (req, res) => cart.ser_confirm_purchase(req, res);
exports.cont_confirm_purchase1= (req, res) => cart.ser_confirm_purchase1(req, res);
exports.cont_update_quantity  = (req, res) => cart.ser_update_quantity(req, res);

// ─── Wallet Controllers ───────────────────────────────────────────────────────
exports.cont_withdraw  = (req, res) => wallet.ser_withdraw1(req, res);
exports.cont_withdraw1 = (req, res) => wallet.ser_withdraw(req, res);
exports.cont_deposit   = (req, res) => wallet.ser_deposit1(req, res);
exports.cont_deposit1  = (req, res) => wallet.ser_deposit(req, res);
exports.cont_balance   = (req, res) => wallet.ser_balance(req, res);

// ─── Mail Controllers ─────────────────────────────────────────────────────────
exports.cont_mailopen          = (req, res) => mail.ser_mailopen(req, res);
exports.cont_user_mail         = (req, res) => mail.ser_user_mail(req, res);
exports.cont_view_user_send_mail = (req, res) => mail.ser_view_user_send_mail(req, res);

// ─── Meeting Controllers ──────────────────────────────────────────────────────
exports.cont_meeting               = (req, res) => meeting.ser_meeting(req, res);
exports.cont_create_meeting        = (req, res) => meeting.ser_create_meeting(req, res);
exports.cont_send_invite           = (req, res) => meeting.ser_send_invite(req, res);
exports.cont_success_meeting_create= (req, res) => meeting.ser_success_meeting_create(req, res);

// ─── Activity Controllers ─────────────────────────────────────────────────────
exports.cont_activity    = (req, res) => activity.ser_activity(req, res);
exports.cont_leaderboard = (req, res) => activity.ser_leaderboard(req, res);

// ─── API Controllers (for header) ─────────────────────────────────────────────
exports.api_search        = (req, res) => user.ser_api_search(req, res);
exports.api_notifications = (req, res) => activity.ser_api_notifications(req, res);

// ─── Header Linked Pages Controllers ──────────────────────────────────────────
exports.cont_settings       = (req, res) => user.ser_settings(req, res);
exports.cont_notifications  = (req, res) => user.ser_notifications(req, res);
exports.cont_messages       = (req, res) => user.ser_messages(req, res);
exports.cont_team           = (req, res) => user.ser_team(req, res);
exports.cont_help           = (req, res) => user.ser_help(req, res);
exports.cont_feedback       = (req, res) => user.ser_feedback(req, res);
