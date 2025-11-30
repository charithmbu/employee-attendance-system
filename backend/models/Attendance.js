const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
date: { type: String, required: true }, // YYYY-MM-DD
checkInTime: { type: String }, // ISO or HH:mm
checkOutTime: { type: String },
status: { type: String, enum: ['present', 'absent', 'late', 'half-day'], default: 'present' },
totalHours: { type: Number, default: 0 },
createdAt: { type: Date, default: Date.now }
});
AttendanceSchema.index({ userId: 1, date: 1 }, { unique: true });
module.exports = mongoose.model('Attendance', AttendanceSchema);