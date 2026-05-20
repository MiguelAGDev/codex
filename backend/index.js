
// Author: Miguel Angel Avila Garcia
// Date: 2026-04-20
// Description: Express server setup with CORS and dotenv configuration. 
// It loads environment variables, enables JSON parsing, defines a test endpoint, 
// and starts the server on the port specified in the .env file.

// Last Modified: 2026-04-23
// Actions: Register auth routes

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');



// dotenv.config() — loads your .env file so process.env.PORT works.
dotenv.config({path: './backend/.env'});

const db = require('./src/config/db'); // Import the database connection (not used in this snippet but will be needed for queries). 
const authRoutes = require('./src/routes/authRoutes'); // Import the authentication routes
const documentRoutes = require('./src/routes/documentRoutes');
const commentRoutes = require('./src/routes/commentRoutes');
const favoriteRoutes = require('./src/routes/favoriteRoutes');
const userRoutes = require('./src/routes/userRoutes');

db.query('SELECT 1')
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection failed:', err));

const app = express();

// app.use(cors()) — allows the frontend to talk to this server.
app.use(cors());

//app.use(express.json()) — lets Express read JSON from request bodies.
app.use(express.json());

// app.get('/') — a test endpoint to confirm the server is alive.
app.get('/', (req, res) => {
    res.json({message: 'Codex API running'});
});

// Register the routes under the /auth prefix. This means:
// router.post('/register')  →  full URL: POST /auth/register
// router.post('/login')     →  full URL: POST /auth/login
app.use('/auth', authRoutes);

// Register additional routes
app.use('/documents', documentRoutes);
app.use('/comments', commentRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/users', userRoutes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT  = process.env.PORT;

// app.listen() — starts the server on port 3000 (or whatever is in .env).

app.listen(PORT, ()=>{

    console.log(`Server running on port ${PORT}`);

});




