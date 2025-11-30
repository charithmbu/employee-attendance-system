require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Attendance = require('./models/Attendance');
const connectDB = require('./config/db');

const seed = async () => {
  try {
  
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/attendance_db');

   
    await User.deleteMany({});
    await Attendance.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash('password123', salt);

 
    const manager = await User.create({
      name: 'Alice Manager',
      email: 'alice.manager@example.com',
      password: pwd,
      role: 'manager',
      employeeId: 'MGR001',
      department: 'HR'
    });

    const emp1 = await User.create({
      name: 'Bob Employee',
      email: 'bob.employee@example.com',
      password: pwd,
      role: 'employee',
      employeeId: 'EMP001',
      department: 'Engineering'
    });

    const emp2 = await User.create({
      name: 'Carol Employee',
      email: 'carol.employee@example.com',
      password: pwd,
      role: 'employee',
      employeeId: 'EMP002',
      department: 'Design'
    });

  
    const today = new Date();
    const isoDate = (date) => date.toISOString().slice(0, 10);

    
    const day1 = new Date(today.getTime() - 2 * 24 * 3600000);
    await Attendance.create({
      userId: emp1._id,
      date: isoDate(day1),
      checkInTime: day1.toISOString(),
      checkOutTime: new Date(day1.getTime() + 8 * 3600000).toISOString(),
      status: 'present',
      totalHours: 8
    });

  
    const day2 = new Date(today.getTime() - 1 * 24 * 3600000);
    await Attendance.create({
      userId: emp1._id,
      date: isoDate(day2),
      checkInTime: day2.toISOString(),
      checkOutTime: new Date(day2.getTime() + 6 * 3600000).toISOString(),
      status: 'late',
      totalHours: 6
    });

    console.log('Seed complete');
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
