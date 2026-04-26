// Author: Miguel Angel Avila Garcia
// Date: 2026-04-23
// Description: 

// Last Modified: 
// Actions: 

const bcrypt = require('bcryptjs'); // Import the bcryptjs library for hashing passwords
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for handling JWTs
const {findUserByEmail, createUser} = require('../models/userModel'); // Import the findUserByUsername and createUser functions from the userModel

const register = async (req, res) => {

    const {name, email, password} = req.body; // Extract the name, email, and password from the request body

    if(!name || !email || !password) return res.status(400).json({error: 'All fields are required'});
    

    const existingUser = await findUserByEmail(email); // Check if a user with the same email already exists in the database

    if(existingUser) return res.status(409).json({error : 'Email already in use'    }); // If a user with the same email exists, return a 409 Conflict response

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt rounds of 10
    const newUserId = await createUser(name, email, hashedPassword, 1); // Create a new user in the database with the provided name, email, and hashed password

    const token = jwt.sign(
        {id: newUserId, role: 1},
        process.env.JWT_SECRET, 
        {expiresIn: '24h'}
    );

    res.status(201).json({token});

}; // end register()

const login = async (req, res) => {

    const {email, password} = req.body; // Extract the email and password from the request body

    if(!email || !password) return res.status(400).json({error: 'All fields are required'}); // If either email or password is missing, return a 400 Bad Request response

    const user = await findUserByEmail(email); // Find the user in the database by their email
    if(!user) return res.status(401).json({error: 'Invalid credentials'}); // If the user is not found, return a 401 Unauthorized response
 
    const passwordMatch = await bcrypt.compare(password, user.usr_password); // Compare the provided password with the hashed password stored in the database
    if(!passwordMatch) return res.status(401).json({error: 'Invalid credentials'}); // If the passwords do not match, return a 401 Unauthorized response

    const token = jwt.sign(
        {id: user.usr_id, role: user.usr_rol_id},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
    );

    res.status(200).json({token}); // If the login is successful, return a 200 OK response with the generated JWT token
    
}

module.exports = {register, login}; // Export the register and login functions for use in other parts of the application



