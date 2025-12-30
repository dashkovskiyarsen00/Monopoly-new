import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import './styles/globals.css';
import './styles/theme.css';

const App = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Monopoly Online</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/lobby">Lobby</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cases">Cases</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        <div className="auth-block">
          {user ? (
            <>
              <span>Hi, {user.nickname}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login">Login</Link>
              <Link to="/auth/register">Register</Link>
            </>
          )}
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
