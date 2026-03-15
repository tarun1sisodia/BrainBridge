import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectMongo from './config/mongo.js';
import { connectRedis } from './config/redis.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connect Databases
connectMongo();
connectRedis();

// Routes
import sessionRoutes from './routes/sessionRoutes.js';
import telemetryRoutes from './routes/telemetryRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';

app.use('/api/sessions', sessionRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/predict', predictionRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
