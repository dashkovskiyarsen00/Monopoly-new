import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoom, fetchRooms, quickMatch } from '../api/gameApi';
import { useLobbyStore } from '../store/lobbyStore';
import { useLobbySocket } from '../hooks/useLobbySocket';

const LobbyPage = () => {
  const rooms = useLobbyStore((state) => state.rooms);
  const [mode, setMode] = useState('casual');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const navigate = useNavigate();
  const { refreshRooms } = useLobbySocket();

  useEffect(() => {
    const loadRooms = async () => {
      const data = await fetchRooms();
      refreshRooms();
      if (data.length === 0) {
        return;
      }
    };
    loadRooms();
  }, [refreshRooms]);

  const handleCreate = async () => {
    const room = await createRoom({ mode, boardType: 'brands', maxPlayers });
    navigate(`/game/${room.id}`);
  };

  const handleQuickMatch = async () => {
    const room = await quickMatch({ mode, maxPlayers });
    navigate(`/game/${room.id}`);
  };

  return (
    <section className="page lobby-page">
      <div className="lobby-controls card">
        <h2>Lobby</h2>
        <div className="form-row">
          <label>
            Mode
            <select value={mode} onChange={(event) => setMode(event.target.value)}>
              <option value="casual">Casual</option>
              <option value="fast">Fast</option>
              <option value="ranked">Ranked</option>
            </select>
          </label>
          <label>
            Players
            <select value={maxPlayers} onChange={(event) => setMaxPlayers(Number(event.target.value))}>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>
        </div>
        <div className="button-row">
          <button className="primary" onClick={handleCreate}>Create room</button>
          <button className="secondary" onClick={handleQuickMatch}>Quick match</button>
        </div>
      </div>
      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="card room-card">
            <h3>{room.mode.toUpperCase()} · {room.players.length}/{room.maxPlayers}</h3>
            <p>Room ID: {room.id}</p>
            <button onClick={() => navigate(`/game/${room.id}`)}>Join</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LobbyPage;
