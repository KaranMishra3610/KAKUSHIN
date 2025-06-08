import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', isOrganizer: false });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      login(res.data);
      navigate('/');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} required /><br /><br />
      <input type="email" placeholder="Email" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} required /><br /><br />
      <input type="password" placeholder="Password" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })} required /><br /><br />
      <label>
        <input type="checkbox" checked={form.isOrganizer}
          onChange={(e) => setForm({ ...form, isOrganizer: e.target.checked })} />
        I'm an organizer
      </label><br /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
