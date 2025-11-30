import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myHistory } from '../../slices/attendanceSlice';

export default function AttendanceHistory() {
  const dispatch = useDispatch();
  const { history } = useSelector((s) => s.attendance);

  useEffect(() => {
    dispatch(myHistory());
  }, []);

  return (
    <div>
      <h3>My Attendance History</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Total Hours</th>
          </tr> 
        </thead>

        <tbody>
          {history.map((h) => (
            <tr key={h._id}>
              <td>{h.date}</td>
              <td>{h.checkInTime || '-'}</td>
              <td>{h.checkOutTime || '-'}</td>
              <td>{h.status}</td>
              <td>{h.totalHours || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
