import express from 'express';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { connectDb } from './config/db';
import { env } from './config/env';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import gameRoutes from './routes/gameRoutes';
import shopRoutes from './routes/shopRoutes';
import statsRoutes from './routes/statsRoutes';
import { errorHandler, ApiError } from './utils/errorHandler';
import { notFound } from './middleware/errorMiddleware';
import { registerSockets } from './sockets';
import { ShopItem } from './models/ShopItem';
import { CaseModel } from './models/Case';

const app = express();
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/stats', statsRoutes);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: env.clientUrl,
    methods: ['GET', 'POST']
  }
});

registerSockets(io);

const seedStore = async () => {
  const shopCount = await ShopItem.countDocuments();
  if (shopCount === 0) {
    await ShopItem.insertMany([
      {
        name: 'Neon Token',
        description: 'Glow effect for your token',
        type: 'token',
        price: 250,
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/168/168882.png',
        rarity: 'rare'
      },
      {
        name: 'Golden Frame',
        description: 'Luxury avatar frame',
        type: 'frame',
        price: 500,
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png',
        rarity: 'epic'
      },
      {
        name: 'Spark Dice',
        description: 'Sparkly dice effect',
        type: 'effect',
        price: 200,
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3534/3534011.png',
        rarity: 'common'
      }
    ]);
  }
  const caseCount = await CaseModel.countDocuments();
  if (caseCount === 0) {
    await CaseModel.insertMany([
      {
        name: 'Starter Case',
        price: 300,
        drops: [
          {
            name: 'Classic Token',
            type: 'token',
            rarity: 'common',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/992/992703.png',
            weight: 60
          },
          {
            name: 'Silver Frame',
            type: 'frame',
            rarity: 'rare',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/1055/1055646.png',
            weight: 30
          },
          {
            name: 'Lightning Dice',
            type: 'effect',
            rarity: 'epic',
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/3534/3534011.png',
            weight: 10
          }
        ]
      }
    ]);
  }
};

const start = async () => {
  try {
    await connectDb();
    await seedStore();
    server.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error(error);
    throw new ApiError('Failed to start server');
  }
};

start();
