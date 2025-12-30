import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import LobbyPage from '../pages/LobbyPage';
import GamePage from '../pages/GamePage';
import ShopPage from '../pages/ShopPage';
import CasesPage from '../pages/CasesPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import SettingsPage from '../pages/SettingsPage';
import AdminPage from '../pages/AdminPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'lobby', element: <LobbyPage /> },
      { path: 'game/:roomId', element: <GamePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'cases', element: <CasesPage /> },
      { path: 'leaderboard', element: <LeaderboardPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'admin', element: <AdminPage /> }
    ]
  }
]);
