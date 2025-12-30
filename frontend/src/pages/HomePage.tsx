import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="page home-page">
      <div className="hero">
        <h1>Online Monopoly</h1>
        <p>Play real-time Monopoly with friends. Create rooms, roll dice, buy brands, and climb the ranks.</p>
        <div className="hero-actions">
          <Link to="/lobby" className="primary">Play now</Link>
          <Link to="/leaderboard" className="secondary">View leaderboard</Link>
        </div>
      </div>
      <div className="grid-cards">
        <div className="card">
          <h3>Real-time rooms</h3>
          <p>Lobby updates instantly with new games and players.</p>
        </div>
        <div className="card">
          <h3>Competitive ranked</h3>
          <p>Earn MMR and climb from Bronze to Grandmaster.</p>
        </div>
        <div className="card">
          <h3>Cosmetics & cases</h3>
          <p>Unlock tokens, frames, and dice effects in the shop.</p>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
