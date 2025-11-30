import React, { useState } from 'react';
import API from '../../api';

export default function Reports() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [employeeId, setEmployeeId] = useState('');

  const exportCsv = () => {
    const params = new URLSearchParams();
    if (start) params.append('startDate', start);
    if (end) params.append('endDate', end);
    if (employeeId) params.append('employeeId', employeeId);
    window.open(`/api/attendance/export?${params.toString()}`);
  };

  return (
    <div>
      <h3>Export Reports</h3>

      <label>Start Date</label>
      <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />

      <label>End Date</label>
      <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />

      <label>Employee ID (optional)</label>
      <input value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />

      <button onClick={exportCsv}>Export CSV</button>
    </div>
  );
}
