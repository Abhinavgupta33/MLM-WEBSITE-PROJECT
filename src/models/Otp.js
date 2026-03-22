const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email:     { type: String },
    otp:       { type: String },
    createdAt: { type: Date, default: Date.now, expires: 300 } // auto-delete after 5 min
});

module.exports = mongoose.model('Otp', otpSchema);
