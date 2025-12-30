import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGameStore } from '../store/gameStore';
import { useGameSocket } from '../hooks/useGameSocket';

const GamePage = () => {
  const { roomId } = useParams();
  const user = useAuthStore((state) => state.user);
  const room = useGameStore((state) => state.room);
  const dice = useGameStore((state) => state.dice);
  const { joinRoom, startGame, rollDice, buyProperty, endTurn } = useGameSocket();

  useEffect(() => {
    if (!roomId || !user) return;
    joinRoom({
      roomId,
      userId: user.id,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl
    });
  }, [joinRoom, roomId, user]);

  if (!room) {
    return <p className="page">Loading room...</p>;
  }

  const currentPlayer = room.players[room.currentTurnIndex];
  const isMyTurn = currentPlayer?.userId === user?.id;
  const cell = room.board[currentPlayer?.position ?? 0];

  return (
    <section className="page game-page">
      <div className="game-layout">
        <aside className="players-panel">
          <h3>Players</h3>
          {room.players.map((player) => (
            <div key={player.userId} className={`player-card ${player.userId === currentPlayer?.userId ? 'active' : ''}`}>
              <img src={player.avatarUrl} alt={player.nickname} />
              <div>
                <strong>{player.nickname}</strong>
                <p>${player.balance}</p>
              </div>
            </div>
          ))}
          <div className="actions">
            {room.status === 'waiting' ? (
              <button className="primary" onClick={() => startGame(room.id)}>
                Start game
              </button>
            ) : (
              <>
                <button className="primary" onClick={() => rollDice(room.id)} disabled={!isMyTurn}>
                  Roll dice
                </button>
                <button onClick={() => buyProperty(room.id, user?.id ?? '')} disabled={!isMyTurn}>
                  Buy property
                </button>
                <button onClick={() => endTurn(room.id)} disabled={!isMyTurn}>
                  End turn
                </button>
              </>
            )}
          </div>
          {dice && <p>Dice: {dice[0]} + {dice[1]}</p>}
          <div className="log">
            <h4>Log</h4>
            <ul>
              {room.log.slice(-6).map((entry, index) => (
                <li key={`${entry}-${index}`}>{entry}</li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="board-wrapper">
          <div className="board-grid">
            {room.board.map((boardCell) => (
              <div key={boardCell.index} className={`board-cell ${boardCell.type}`}>
                <div className="cell-title">
                  <span className="color" style={{ background: boardCell.color ?? 'transparent' }} />
                  <strong>{boardCell.name}</strong>
                </div>
                {boardCell.price && <span>${boardCell.price}</span>}
                <div className="tokens">
                  {room.players
                    .filter((player) => player.position === boardCell.index)
                    .map((player) => (
                      <span key={player.userId} className="token">
                        {player.nickname[0].toUpperCase()}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="info-panel">
          <h3>Turn</h3>
          <p>{currentPlayer?.nickname}'s turn</p>
          {cell && (
            <div className="card">
              <h4>Current cell</h4>
              <p>{cell.name}</p>
              {'price' in cell && <p>Price: ${cell.price}</p>}
            </div>
          )}
          <div className="card">
            <h4>Room</h4>
            <p>Mode: {room.mode}</p>
            <p>Status: {room.status}</p>
            <p>Players: {room.players.length}/{room.maxPlayers}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default GamePage;
