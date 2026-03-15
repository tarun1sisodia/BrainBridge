require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectMongo = require('./config/mongo');
const { connectRedis } = require('./config/redis');

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
const sessionRoutes = require('./routes/sessionRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

app.use('/api/sessions', sessionRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api/predict', predictionRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
