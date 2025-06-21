const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenvFlow = require('dotenv-flow')

// Load environment variables
const postRoutes = require('./api/routes/postRoutes');

// Load environment variables
dotenvFlow.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 9090;
const MONGODB_URI = "mongodb+srv://blog-app:aMz0XrKPYtDchb5H@codethon.mbk8a.mongodb.net/blog-app?retryWrites=true&w=majority&appName=codethon"
console.log(MONGODB_URI)

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
