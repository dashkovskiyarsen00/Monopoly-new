import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { env } from '../config/env';
import { useLobbyStore } from '../store/lobbyStore';

let socket: Socket | null = null;

export const useLobbySocket = () => {
  const setRooms = useLobbyStore((state) => state.setRooms);

  useEffect(() => {
    if (!socket) {
      socket = io(env.socketUrl);
    }
    socket.on('rooms:update', (rooms) => {
      setRooms(rooms);
    });

    return () => {
      socket?.off('rooms:update');
    };
  }, [setRooms]);

  const refreshRooms = () => socket?.emit('rooms:refresh');

  return { refreshRooms };
};
