require('./fix-dns');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

connectDB();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:5174',
    'http://localhost:5173',
    'https://vaultly-password-manager.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('/(.*)', cors(corsOptions));
app.use(express.json());

const authRouter = require('./src/routes/auth.routes');
const vaultRouter = require('./src/routes/vault.routes');

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/vault', vaultRouter);

app.use((err, req, res, next) => {
  console.error(`[Global Error] ${err.stack || err.message}`);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'An unexpected server error occurred.',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Vaultly server listening on port ${PORT}`);
});