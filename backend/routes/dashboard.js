const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');
router.get('/employee', auth, dashboardController.employeeStats);
router.get('/manager', auth, dashboardController.managerStats);
module.exports = router;