import { v4 as uuid } from 'uuid';

export type GameMode = 'casual' | 'fast' | 'ranked';

export interface PlayerState {
  id: string;
  userId: string;
  nickname: string;
  avatarUrl: string;
  position: number;
  balance: number;
  properties: number[];
  jailed: boolean;
  jailTurns: number;
}

export interface PropertyCell {
  index: number;
  name: string;
  price: number;
  rent: number[];
  color: string;
  type: 'property';
  ownerId?: string;
}

export interface SpecialCell {
  index: number;
  name: string;
  type: 'start' | 'jail' | 'parking' | 'go-to-jail' | 'tax' | 'chance' | 'community';
  value?: number;
}

export type BoardCell = PropertyCell | SpecialCell;

export interface GameRoom {
  id: string;
  mode: GameMode;
  boardType: 'classic' | 'brands';
  maxPlayers: number;
  players: PlayerState[];
  board: BoardCell[];
  status: 'waiting' | 'active' | 'finished';
  currentTurnIndex: number;
  log: string[];
  createdAt: number;
}

const rooms = new Map<string, GameRoom>();

const defaultBoard: BoardCell[] = [
  { index: 0, name: 'Start', type: 'start' },
  { index: 1, name: 'Apple Park', type: 'property', price: 60, rent: [4, 20, 60, 180, 320, 450], color: '#7f5b3b' },
  { index: 2, name: 'Community Chest', type: 'community' },
  { index: 3, name: 'Google Campus', type: 'property', price: 60, rent: [4, 20, 60, 180, 320, 450], color: '#7f5b3b' },
  { index: 4, name: 'Income Tax', type: 'tax', value: 200 },
  { index: 5, name: 'Amazon Hub', type: 'property', price: 200, rent: [25, 50, 100, 200, 400, 600], color: '#888' },
  { index: 6, name: 'Netflix Studios', type: 'property', price: 100, rent: [6, 30, 90, 270, 400, 550], color: '#6db8ff' },
  { index: 7, name: 'Chance', type: 'chance' },
  { index: 8, name: 'Sony HQ', type: 'property', price: 100, rent: [6, 30, 90, 270, 400, 550], color: '#6db8ff' },
  { index: 9, name: 'Adidas Arena', type: 'property', price: 120, rent: [8, 40, 100, 300, 450, 600], color: '#6db8ff' },
  { index: 10, name: 'Jail', type: 'jail' },
  { index: 11, name: 'BMW Towers', type: 'property', price: 140, rent: [10, 50, 150, 450, 625, 750], color: '#c657cf' },
  { index: 12, name: 'Power Grid', type: 'property', price: 150, rent: [12, 60, 180, 500, 700, 900], color: '#888' },
  { index: 13, name: 'Mercedes Plaza', type: 'property', price: 140, rent: [10, 50, 150, 450, 625, 750], color: '#c657cf' },
  { index: 14, name: 'Nike Labs', type: 'property', price: 160, rent: [12, 60, 180, 500, 700, 900], color: '#c657cf' },
  { index: 15, name: 'Tesla Station', type: 'property', price: 200, rent: [25, 50, 100, 200, 400, 600], color: '#888' },
  { index: 16, name: 'Coca-Cola HQ', type: 'property', price: 180, rent: [14, 70, 200, 550, 750, 950], color: '#ffae4d' },
  { index: 17, name: 'Community Chest', type: 'community' },
  { index: 18, name: 'ZARA Studio', type: 'property', price: 180, rent: [14, 70, 200, 550, 750, 950], color: '#ffae4d' },
  { index: 19, name: 'H&M Hub', type: 'property', price: 200, rent: [16, 80, 220, 600, 800, 1000], color: '#ffae4d' },
  { index: 20, name: 'Free Parking', type: 'parking' },
  { index: 21, name: 'Samsung Square', type: 'property', price: 220, rent: [18, 90, 250, 700, 875, 1050], color: '#ff4f4f' },
  { index: 22, name: 'Chance', type: 'chance' },
  { index: 23, name: 'LG Tech', type: 'property', price: 220, rent: [18, 90, 250, 700, 875, 1050], color: '#ff4f4f' },
  { index: 24, name: 'Netflix Arena', type: 'property', price: 240, rent: [20, 100, 300, 750, 925, 1100], color: '#ff4f4f' },
  { index: 25, name: 'BMW Express', type: 'property', price: 200, rent: [25, 50, 100, 200, 400, 600], color: '#888' },
  { index: 26, name: 'Rolex Tower', type: 'property', price: 260, rent: [22, 110, 330, 800, 975, 1150], color: '#f0d778' },
  { index: 27, name: 'Gucci Loft', type: 'property', price: 260, rent: [22, 110, 330, 800, 975, 1150], color: '#f0d778' },
  { index: 28, name: 'Water Works', type: 'property', price: 150, rent: [12, 60, 180, 500, 700, 900], color: '#888' },
  { index: 29, name: 'Louis Vuitton', type: 'property', price: 280, rent: [24, 120, 360, 850, 1025, 1200], color: '#f0d778' },
  { index: 30, name: 'Go To Jail', type: 'go-to-jail' },
  { index: 31, name: 'Microsoft Plaza', type: 'property', price: 300, rent: [26, 130, 390, 900, 1100, 1275], color: '#3ecc7a' },
  { index: 32, name: 'Apple Store', type: 'property', price: 300, rent: [26, 130, 390, 900, 1100, 1275], color: '#3ecc7a' },
  { index: 33, name: 'Community Chest', type: 'community' },
  { index: 34, name: 'Amazon Tower', type: 'property', price: 320, rent: [28, 150, 450, 1000, 1200, 1400], color: '#3ecc7a' },
  { index: 35, name: 'Tesla Rail', type: 'property', price: 200, rent: [25, 50, 100, 200, 400, 600], color: '#888' },
  { index: 36, name: 'Chance', type: 'chance' },
  { index: 37, name: 'Meta HQ', type: 'property', price: 350, rent: [35, 175, 500, 1100, 1300, 1500], color: '#2e3eff' },
  { index: 38, name: 'Luxury Tax', type: 'tax', value: 100 },
  { index: 39, name: 'Netflix Prime', type: 'property', price: 400, rent: [50, 200, 600, 1400, 1700, 2000], color: '#2e3eff' }
];

const cloneBoard = (): BoardCell[] => JSON.parse(JSON.stringify(defaultBoard));

export const listRooms = (): GameRoom[] => Array.from(rooms.values());

export const createRoom = ({
  mode,
  boardType,
  maxPlayers
}: {
  mode: GameMode;
  boardType: 'classic' | 'brands';
  maxPlayers: number;
}): GameRoom => {
  const id = uuid();
  const room: GameRoom = {
    id,
    mode,
    boardType,
    maxPlayers,
    players: [],
    board: cloneBoard(),
    status: 'waiting',
    currentTurnIndex: 0,
    log: [],
    createdAt: Date.now()
  };
  rooms.set(id, room);
  return room;
};

export const joinRoom = (roomId: string, player: PlayerState): GameRoom => {
  const room = rooms.get(roomId);
  if (!room) {
    throw new Error('Room not found');
  }
  if (room.players.find((existing) => existing.userId === player.userId)) {
    return room;
  }
  if (room.players.length >= room.maxPlayers) {
    throw new Error('Room full');
  }
  room.players.push(player);
  return room;
};

export const leaveRoom = (roomId: string, userId: string): GameRoom | undefined => {
  const room = rooms.get(roomId);
  if (!room) return;
  room.players = room.players.filter((player) => player.userId !== userId);
  if (room.players.length === 0) {
    rooms.delete(roomId);
    return;
  }
  if (room.currentTurnIndex >= room.players.length) {
    room.currentTurnIndex = 0;
  }
  return room;
};

export const startGame = (roomId: string): GameRoom => {
  const room = rooms.get(roomId);
  if (!room) throw new Error('Room not found');
  if (room.players.length < 2) throw new Error('Need at least 2 players');
  room.status = 'active';
  room.log.push('Game started');
  return room;
};

export const rollDice = (roomId: string): { room: GameRoom; dice: [number, number] } => {
  const room = rooms.get(roomId);
  if (!room) throw new Error('Room not found');
  const dice: [number, number] = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1
  ];
  const player = room.players[room.currentTurnIndex];
  const steps = dice[0] + dice[1];
  player.position = (player.position + steps) % room.board.length;
  if (player.position === 0) {
    player.balance += 200;
    room.log.push(`${player.nickname} received $200 for passing Start.`);
  }
  const cell = room.board[player.position];
  if (cell.type === 'tax' && cell.value) {
    player.balance = Math.max(0, player.balance - cell.value);
    room.log.push(`${player.nickname} paid tax $${cell.value}.`);
  }
  if (cell.type === 'go-to-jail') {
    player.position = 10;
    player.jailed = true;
    player.jailTurns = 2;
    room.log.push(`${player.nickname} went to jail.`);
  }
  if (cell.type === 'property') {
    if (!cell.ownerId) {
      room.log.push(`${player.nickname} landed on ${cell.name}.`);
    } else if (cell.ownerId !== player.userId) {
      const rent = cell.rent[0];
      player.balance = Math.max(0, player.balance - rent);
      const owner = room.players.find((p) => p.userId === cell.ownerId);
      if (owner) {
        owner.balance += rent;
      }
      room.log.push(`${player.nickname} paid rent $${rent}.`);
    }
  }
  return { room, dice };
};

export const buyProperty = (roomId: string, userId: string): GameRoom => {
  const room = rooms.get(roomId);
  if (!room) throw new Error('Room not found');
  const player = room.players.find((p) => p.userId === userId);
  if (!player) throw new Error('Player not found');
  const cell = room.board[player.position];
  if (cell.type !== 'property') throw new Error('Not a property');
  if (cell.ownerId) throw new Error('Property already owned');
  if (player.balance < cell.price) throw new Error('Not enough funds');
  player.balance -= cell.price;
  player.properties.push(cell.index);
  cell.ownerId = player.userId;
  room.log.push(`${player.nickname} bought ${cell.name}.`);
  return room;
};

export const endTurn = (roomId: string): GameRoom => {
  const room = rooms.get(roomId);
  if (!room) throw new Error('Room not found');
  room.currentTurnIndex = (room.currentTurnIndex + 1) % room.players.length;
  return room;
};

export const getRoom = (roomId: string): GameRoom | undefined => rooms.get(roomId);

export const findRoomForMode = (mode: GameMode, maxPlayers: number): GameRoom | undefined => {
  return Array.from(rooms.values()).find(
    (room) => room.mode === mode && room.players.length < room.maxPlayers && room.maxPlayers === maxPlayers
  );
};
