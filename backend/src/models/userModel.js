// Author: Miguel Angel Avila Garcia
// Date: 2026-04-22
// Description: User model — all SQL queries related to users.

// Last Modified: 
// Actions: 


// pool import the database connection
const pool = require('../config/db');


// Execute a SQL query to find a user by their email address. 
// async menas the will wait for the databes to respond before continuing.
const findUserByEmail = async (email) =>{
    
    //Recive the result [rows | fields], i only care for the rows
    // await make javaScript wait for the database to respond before moving on
    const [rows] = await pool.query(
        `SELECT * 
        FROM users
        WHERE usr_email = ?`, [email]
    );

    // Array of all matching records
    // Sinces email are unique ther will be only one
    // result
    return rows[0];
};


// Execute a SQL query to create a new user in the database.
// The function takes the user's name, email, hashed password, 
// and role as parameters and inserts a new record into the users 
// table. It returns the ID of the newly created user.
const createUser = 
async (name, email, passwordHash, role) =>{

    const [result] = await pool.query(
        `INSERT INTO users (usr_name, usr_email, usr_password, usr_rol_id)
        VALUES (?, ?, ?, ?)`, 
        [name, email, passwordHash, role]

    );

    // After the insert, MySQL returns the information
    // abaout what happened. insertId is the ID of the newly created row
    return result.insertId;
};

// Execute a SQL query to retrieve a user by their ID
const getUserById = async (userId) => {
    const [rows] = await pool.query(
        `SELECT usr_id, usr_name, usr_email, usr_rol_id, usr_created_at, usr_updated_at
         FROM users
         WHERE usr_id = ?`,
        [userId]
    );

    return rows[0] || null;
};

// Execute a SQL query to update a user's name and email
const updateUser = async (userId, name, email) => {
    const [result] = await pool.query(
        `UPDATE users
         SET usr_name = ?, usr_email = ?, usr_updated_at = NOW()
         WHERE usr_id = ?`,
        [name, email, userId]
    );

    return result.affectedRows > 0;
};

// Makes both functions available to other files that requires
// this model
module.exports = {findUserByEmail, createUser, getUserById, updateUser};