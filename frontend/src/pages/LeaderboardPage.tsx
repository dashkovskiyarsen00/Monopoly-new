import { useEffect, useState } from 'react';
import { fetchLeaderboard } from '../api/statsApi';

const LeaderboardPage = () => {
  const [type, setType] = useState<'mmr' | 'wins' | 'games'>('mmr');
  const [leaders, setLeaders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLeaderboard(type);
      setLeaders(data);
    };
    load();
  }, [type]);

  return (
    <section className="page leaderboard-page">
      <h2>Leaderboards</h2>
      <div className="form-row">
        <label>
          Sort by
          <select value={type} onChange={(event) => setType(event.target.value as 'mmr' | 'wins' | 'games')}>
            <option value="mmr">MMR</option>
            <option value="wins">Wins</option>
            <option value="games">Games played</option>
          </select>
        </label>
      </div>
      <div className="card">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>MMR</th>
              <th>Wins</th>
              <th>Games</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader, index) => (
              <tr key={leader._id}>
                <td>{index + 1}</td>
                <td>{leader.nickname}</td>
                <td>{leader.rating?.mmr ?? '-'}</td>
                <td>{leader.stats?.wins ?? '-'}</td>
                <td>{leader.stats?.gamesPlayed ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LeaderboardPage;
