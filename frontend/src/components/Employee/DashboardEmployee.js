import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import API from '../../api';
import { Link } from 'react-router-dom';
import { myHistory } from '../../slices/attendanceSlice';
export default function DashboardEmployee() {
const { user } = useSelector(s => s.auth);
const { history } = useSelector(s => s.attendance);
const dispatch = useDispatch();
useEffect(() => { dispatch(myHistory()); }, []);
const checkIn = async () => { await API.post('/attendance/checkin');
dispatch(myHistory()); };
const checkOut = async () => { await API.post('/attendance/checkout');
dispatch(myHistory()); };
return (
<div>
<h2>Welcome, {user?.name}</h2>
<div>
<button onClick={checkIn}>Check In</button>
<button onClick={checkOut}>Check Out</button>
<Link to="/employee/history">My Attendance History</Link>
</div>
<section>
<h3>Recent Attendance (last 7)</h3>
<ul>
{history.slice(0,7).map(a => (
<li key={a._id}>{a.date} - {a.status} - {a.totalHours || 0}h</li>
))}
</ul>
</section>
</div>
);
}