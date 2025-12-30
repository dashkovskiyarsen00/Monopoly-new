import { Server, Socket } from 'socket.io';
import { listRooms } from '../services/gameService';

export const lobbySocket = (io: Server, socket: Socket): void => {
  socket.emit('rooms:update', listRooms());

  socket.on('rooms:refresh', () => {
    socket.emit('rooms:update', listRooms());
  });

  socket.on('disconnect', () => {
    socket.leave('lobby');
  });
};

export const broadcastRooms = (io: Server): void => {
  io.emit('rooms:update', listRooms());
};
