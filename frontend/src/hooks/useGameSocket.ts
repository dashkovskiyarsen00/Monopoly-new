import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { env } from '../config/env';
import { useGameStore } from '../store/gameStore';

export const useGameSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const setRoom = useGameStore((state) => state.setRoom);
  const setDice = useGameStore((state) => state.setDice);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(env.socketUrl);
    }
    const socket = socketRef.current;
    socket.on('room:update', (room) => setRoom(room));
    socket.on('game:dice', (dice) => setDice(dice));

    return () => {
      socket.off('room:update');
      socket.off('game:dice');
    };
  }, [setRoom, setDice]);

  const joinRoom = (payload: { roomId: string; userId: string; nickname: string; avatarUrl?: string }) =>
    socketRef.current?.emit('room:join', payload);
  const leaveRoom = (payload: { roomId: string; userId: string }) => socketRef.current?.emit('room:leave', payload);
  const startGame = (roomId: string) => socketRef.current?.emit('room:start', { roomId });
  const rollDice = (roomId: string) => socketRef.current?.emit('game:roll', { roomId });
  const buyProperty = (roomId: string, userId: string) =>
    socketRef.current?.emit('game:buy', { roomId, userId });
  const endTurn = (roomId: string) => socketRef.current?.emit('game:end-turn', { roomId });

  return { joinRoom, leaveRoom, startGame, rollDice, buyProperty, endTurn };
};
