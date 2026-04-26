// Author: Miguel Angel Avila Garcia
// Date: 2026-04-20
// Description: This file sets up the database connection using mysql2 and dotenv. It creates a connection pool and exports it for use in other parts of the application.

// Last Modified: 
// Actions: 

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// mysql.createPool() — instead of opening one connection, a pool manages multiple connections automatically. More efficient for a web server handling several requests.
const pool = mysql.createPool({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

// module.exports — exports the pool so any other file can import it and run queries.
module.exports = pool;