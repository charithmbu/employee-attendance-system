import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('EMP' + Math.floor(Math.random() * 900 + 100));
  const [role, setRole] = useState('employee');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(
        register({ name, email, password, role, employeeId })
      ).unwrap();

      if (res.user.role === 'manager') navigate('/manager');
      else navigate('/employee');

    } catch (err) {
      alert('Register failed');
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Register</h3>

      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
      </select>

      <label>Employee ID</label>
      <input
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      />

      <button type="submit">Register</button>
    </form>
  );
}
