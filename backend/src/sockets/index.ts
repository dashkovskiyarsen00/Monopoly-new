import { Server } from 'socket.io';
import { gameSocket } from './gameSocket';
import { lobbySocket } from './lobbySocket';

export const registerSockets = (io: Server): void => {
  io.on('connection', (socket) => {
    lobbySocket(io, socket);
    gameSocket(io, socket);
  });
};
