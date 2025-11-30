import React, { useEffect, useState } from 'react';
import API from '../../api';
import { Link } from 'react-router-dom';
export default function DashboardManager() {
const [stats, setStats] = useState(null);
useEffect(() => { API.get('/dashboard/manager').then(r =>
setStats(r.data)); }, []);
return (
<div>
<h2>Manager Dashboard</h2>
{stats ? (
<div>
<p>Total Employees: {stats.totalEmployees}</p>
<p>Present Today: {stats.present}</p>
<p>Absent Today: {stats.absent}</p>
<p>Late Today: {stats.lateToday}</p>
<Link to="/manager/all">View All Attendance</Link>
<Link to="/manager/reports">Reports</Link>
</div>
) : <p>Loading...</p>}
</div>
);
}
