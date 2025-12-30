import { useEffect, useState } from 'react';
import { fetchInventory, fetchProfile } from '../api/userApi';
import { useAuthStore } from '../store/authStore';

const ProfilePage = () => {
  const [inventory, setInventory] = useState<any[]>([]);
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      const profile = await fetchProfile();
      setAuth(token, profile);
      const inventoryData = await fetchInventory();
      setInventory(inventoryData.inventory ?? []);
    };
    load();
  }, [setAuth, token]);

  if (!user) {
    return <p className="page">Please log in to view profile.</p>;
  }

  return (
    <section className="page profile-page">
      <div className="profile-header">
        <img src={user.avatarUrl} alt={user.nickname} />
        <div>
          <h2>{user.nickname}</h2>
          <p>{user.rating.rank} · MMR {user.rating.mmr}</p>
          <p>Mastery level: {user.mastery}</p>
        </div>
      </div>
      <div className="grid-cards">
        <div className="card">
          <h3>Stats</h3>
          <ul>
            <li>Games played: {user.stats.gamesPlayed}</li>
            <li>Wins: {user.stats.wins}</li>
            <li>Win rate: {user.stats.winRate}%</li>
            <li>Total time: {user.stats.timePlayed} min</li>
            <li>Max capital: ${user.stats.maxCapital}</li>
          </ul>
        </div>
        <div className="card">
          <h3>Coins</h3>
          <p>{user.coins} coins</p>
        </div>
      </div>
      <div className="card">
        <h3>Inventory</h3>
        <div className="inventory-grid">
          {inventory.map((item) => (
            <div key={item._id} className="inventory-item">
              <img src={item.iconUrl} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>{item.rarity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
