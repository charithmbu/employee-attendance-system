import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function AllAttendance() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.get('/attendance/all').then((r) => setRows(r.data));
  }, []);

  return (
    <div>
      <h3>All Employees Attendance</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Employee ID</th>
            <th>Dept</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.userId?.name}</td>
              <td>{r.userId?.employeeId}</td>
              <td>{r.userId?.department}</td>
              <td>{r.checkInTime || '-'}</td>
              <td>{r.checkOutTime || '-'}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
