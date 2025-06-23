// backend/app.js
const express = require('express');
const cors = require('cors');
const postRoutes = require('./api/routes/postRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Backend server is running', status: 'OK' });
});

module.exports = app;
