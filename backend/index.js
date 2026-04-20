
// Author: Miguel Angel Avila Garcia
// Date: 2026-04-20
// Description: Express server setup with CORS and dotenv configuration. 
// It loads environment variables, enables JSON parsing, defines a test endpoint, 
// and starts the server on the port specified in the .env file.

// Last Modified: 2026-04-20
// Actions: 

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// dotenv.config() — loads your .env file so process.env.PORT works.
dotenv.config();

const db = require('./src/config/db'); // Import the database connection (not used in this snippet but will be needed for queries). 

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

const PORT  = process.env.PORT;

// app.listen() — starts the server on port 3000 (or whatever is in .env).

app.listen(PORT, ()=>{

    console.log(`Server running on port ${PORT}`);

});




