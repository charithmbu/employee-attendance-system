import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(login({ email, password })).unwrap();
      if (res.user.role === 'manager') navigate('/manager');
      else navigate('/employee');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="card">
      <h3>Login</h3>
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}
