import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardEmployee from './components/Employee/DashboardEmployee';
import DashboardManager from './components/Manager/DashboardManager';
import MarkAttendance from './components/Employee/MarkAttendance';
import AttendanceHistory from './components/Employee/AttendanceHistory';
import AllAttendance from './components/Manager/AllAttendance.js';
import Reports from './components/Manager/Reports';
import { fetchMe } from './slices/authSlice';

function App() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      dispatch(fetchMe()).catch(() => {
        localStorage.removeItem('token');
        navigate('/login');
      });
    }
  }, []);

  return (
    <div className="app">
      <header>
        <Link to="/">Attendance System</Link>
        <nav>
          {user ? (
            <>
              {user.role === 'employee' ? (
                <Link to="/employee">Dashboard</Link>
              ) : (
                <Link to="/manager">Manager</Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div>Welcome. Please login or register.</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee" element={<DashboardEmployee />} />
          <Route path="/employee/mark" element={<MarkAttendance />} />
          <Route path="/employee/history" element={<AttendanceHistory />} />
          <Route path="/manager" element={<DashboardManager />} />
          <Route path="/manager/all" element={<AllAttendance />} />
          <Route path="/manager/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
