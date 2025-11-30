const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
const { name, email, password, role, employeeId, department } = req.body;
try {
let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
user = new User({ name, email, password: hashed, role, employeeId, department });
await user.save();
const payload = { id: user.id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, employeeId: user.employeeId } });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.login = async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
const payload = { id: user.id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });
res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, employeeId: user.employeeId } });
} catch (err) {
console.error(err.message);
res.status(500).send('Server error');
}
};


exports.me = async (req, res) => {
res.json(req.user);
};