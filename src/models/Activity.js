const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    user_id:         { type: Number },
    activity:        { type: String },
    activity_detail: { type: String },
    created_at:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('recentactivity', activitySchema);
