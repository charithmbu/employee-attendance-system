import React from 'react';
import API from '../../api';
export default function MarkAttendance() {
const handleCheckIn = async () => {
try { await API.post('/attendance/checkin'); alert('Checked in'); }
catch (e) { alert(e.response?.data?.message || 'Error'); }
};
const handleCheckOut = async () => {
try { await API.post('/attendance/checkout'); alert('Checked out'); }
catch (e) { alert(e.response?.data?.message || 'Error'); }
};
return (
<div className="card">
<h3>Mark Attendance</h3>
<button onClick={handleCheckIn}>Check In</button>
<button onClick={handleCheckOut}>Check Out</button>
</div>
);
}