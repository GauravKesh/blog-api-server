const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./api/routes/postRoutes');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 9090;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(' MongoDB connected successfully'))
  .catch((err) => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });

// Routes

app.use('/api/posts', postRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running', status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
