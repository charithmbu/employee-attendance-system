const Attendance = require('../models/Attendance');
const User = require('../models/User');
exports.employeeStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const date = new Date();
    const month = date.toISOString().slice(0, 7); 
    const start = month + '-01';
    const end = month + '-31';

 
    const records = await Attendance.find({
      userId,
      date: { $gte: start, $lte: end }
    });

    const present = records.filter(r => r.checkInTime).length;
    const late = records.filter(r => r.status === 'late').length;
    const totalHours = records.reduce((sum, r) => sum + (r.totalHours || 0), 0);


    const todayDate = new Date().toISOString().slice(0, 10);
    const today = await Attendance.findOne({
      userId,
      date: todayDate
    });

    res.json({
      present,
      late,
      totalHours: Math.round(totalHours * 100) / 100,
      today: today || null
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.managerStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });

    const todayDate = new Date().toISOString().slice(0, 10);

    const todays = await Attendance.find({ date: todayDate })
      .populate('userId', 'name employeeId department');

    const present = todays.length;
    const absent = Math.max(totalEmployees - present, 0);
    const lateToday = todays.filter(r => r.status === 'late').length;

    res.json({
      totalEmployees,
      present,
      absent,
      lateToday,
      todays
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
