import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const data = await register({ email, password, nickname });
      setAuth(data.token, data.user);
      navigate('/lobby');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <section className="page auth-page">
      <h2>Create account</h2>
      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Nickname
          <input value={nickname} onChange={(event) => setNickname(event.target.value)} required />
        </label>
        <label>
          Password
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="primary">Register</button>
      </form>
    </section>
  );
};

export default RegisterPage;
