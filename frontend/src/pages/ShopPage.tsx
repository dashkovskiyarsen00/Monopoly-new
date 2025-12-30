import { useEffect, useState } from 'react';
import { buyShopItem, fetchShopItems } from '../api/shopApi';
import { useAuthStore } from '../store/authStore';

const ShopPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const load = async () => {
      const data = await fetchShopItems();
      setItems(data);
    };
    load();
  }, []);

  const handleBuy = async (itemId: string) => {
    await buyShopItem(itemId);
    setMessage('Purchased! Check your inventory.');
  };

  return (
    <section className="page shop-page">
      <h2>Shop</h2>
      <p>Coins: {user?.coins ?? 0}</p>
      {message && <p className="success">{message}</p>}
      <div className="grid-cards">
        {items.map((item) => (
          <div className="card" key={item._id}>
            <img src={item.iconUrl} alt={item.name} className="item-icon" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price} coins</p>
            <button onClick={() => handleBuy(item._id)}>Buy</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopPage;
