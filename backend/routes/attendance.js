const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const auth = require('../middleware/auth');
router.post('/checkin', auth, attendanceController.checkin);
router.post('/checkout', auth, attendanceController.checkout);
router.get('/my-history', auth, attendanceController.myHistory);
router.get('/my-summary', auth, attendanceController.mySummary);
router.get('/today', auth, attendanceController.todayStatus);
// manager
router.get('/all', auth, attendanceController.getAll);
router.get('/employee/:id', auth, attendanceController.getEmployee);
router.get('/summary', auth, attendanceController.summary);
router.get('/export', auth, attendanceController.exportCSV);
router.get('/today-status', auth, attendanceController.todayStatus);
module.exports = router;