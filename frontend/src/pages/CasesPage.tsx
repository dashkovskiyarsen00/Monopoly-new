import { useEffect, useState } from 'react';
import { fetchCases, openCase } from '../api/shopApi';

const CasesPage = () => {
  const [cases, setCases] = useState<any[]>([]);
  const [drop, setDrop] = useState<any | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCases();
      setCases(data);
    };
    load();
  }, []);

  const handleOpen = async (caseId: string) => {
    const item = await openCase(caseId);
    setDrop(item);
  };

  return (
    <section className="page cases-page">
      <h2>Cases</h2>
      {drop && (
        <div className="card">
          <h3>You received {drop.name}</h3>
          <img src={drop.iconUrl} alt={drop.name} className="item-icon" />
          <p>{drop.rarity}</p>
        </div>
      )}
      <div className="grid-cards">
        {cases.map((caseItem) => (
          <div className="card" key={caseItem._id}>
            <h3>{caseItem.name}</h3>
            <p>Price: {caseItem.price} coins</p>
            <button onClick={() => handleOpen(caseItem._id)}>Open</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CasesPage;
