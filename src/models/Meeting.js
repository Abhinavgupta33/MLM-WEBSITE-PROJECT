const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingSchema = new Schema({
    title: { type: String, required: true, trim: true },
    dateTime: { type: Date, required: true },
    meetingType: { type: String, enum: ['online', 'offline'], required: true },
    locationDetails: {
        online: {
            platform: {
                type: String,
                enum: ['zoom', 'google_meet', 'teams', 'skype', 'other'],
                required: function () { return this.meetingType === 'online'; }
            },
            link: {
                type: String,
                required: function () {
                    return this.meetingType === 'online' && this.locationDetails.online.platform === 'other';
                },
                trim: true
            }
        },
        offline: {
            address: {
                type: String,
                required: function () { return this.meetingType === 'offline'; },
                trim: true
            },
            coordinates: {
                type: { type: String, enum: ['Point'] },
                coordinates: { type: [Number] }
            }
        }
    },
    category: { type: String, enum: ['training', 'recruitment', 'team', 'product'], required: true },
    description: { type: String, trim: true },
    createdBy: { type: Number, ref: 'User', required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' }
}, { timestamps: true });

meetingSchema.index({ 'locationDetails.offline.coordinates': '2dsphere' });

module.exports = mongoose.model('Meeting', meetingSchema);
