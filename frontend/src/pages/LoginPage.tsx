import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await login({ email, password });
      setAuth(data.token, data.user);
      navigate('/lobby');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="page auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;
