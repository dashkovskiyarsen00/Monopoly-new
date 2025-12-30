import { Server, Socket } from 'socket.io';
import {
  buyProperty,
  endTurn,
  getRoom,
  joinRoom,
  leaveRoom,
  rollDice,
  startGame
} from '../services/gameService';
import { broadcastRooms } from './lobbySocket';

interface JoinPayload {
  roomId: string;
  userId: string;
  nickname: string;
  avatarUrl?: string;
}

export const gameSocket = (io: Server, socket: Socket): void => {
  socket.on('room:join', (payload: JoinPayload) => {
    try {
      const room = joinRoom(payload.roomId, {
        id: socket.id,
        userId: payload.userId,
        nickname: payload.nickname,
        avatarUrl: payload.avatarUrl ?? 'https://i.pravatar.cc/150?img=3',
        position: 0,
        balance: 1500,
        properties: [],
        jailed: false,
        jailTurns: 0
      });
      socket.join(room.id);
      io.to(room.id).emit('room:update', room);
      broadcastRooms(io);
    } catch (error) {
      socket.emit('room:error', (error as Error).message);
    }
  });

  socket.on('room:leave', ({ roomId, userId }: { roomId: string; userId: string }) => {
    const room = leaveRoom(roomId, userId);
    socket.leave(roomId);
    if (room) {
      io.to(roomId).emit('room:update', room);
    }
    broadcastRooms(io);
  });

  socket.on('room:start', ({ roomId }: { roomId: string }) => {
    try {
      const room = startGame(roomId);
      io.to(room.id).emit('room:update', room);
      broadcastRooms(io);
    } catch (error) {
      socket.emit('room:error', (error as Error).message);
    }
  });

  socket.on('game:roll', ({ roomId }: { roomId: string }) => {
    try {
      const { room, dice } = rollDice(roomId);
      io.to(roomId).emit('game:dice', dice);
      io.to(roomId).emit('room:update', room);
    } catch (error) {
      socket.emit('room:error', (error as Error).message);
    }
  });

  socket.on('game:buy', ({ roomId, userId }: { roomId: string; userId: string }) => {
    try {
      const room = buyProperty(roomId, userId);
      io.to(roomId).emit('room:update', room);
    } catch (error) {
      socket.emit('room:error', (error as Error).message);
    }
  });

  socket.on('game:end-turn', ({ roomId }: { roomId: string }) => {
    const room = endTurn(roomId);
    io.to(roomId).emit('room:update', room);
  });

  socket.on('room:state', ({ roomId }: { roomId: string }) => {
    const room = getRoom(roomId);
    if (room) {
      socket.emit('room:update', room);
    }
  });
};
