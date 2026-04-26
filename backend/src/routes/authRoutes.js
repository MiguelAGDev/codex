// Author: Miguel Angel Avila Garcia
// Date: 2026-04-22
// Description: User model — all SQL queries related to users.

// Last Modified: 
// Actions: 

const express = require('express'); // Import the Express library to create a router

// express.Router() creates a mini application thtat only handles routes.
const router = express.Router(); // Create a new router instance

// imports the two functions we built in the controllers. 
// We destructure them directly so we can use them by the name on the next lines
const {register, login} = require('../controllers/authController'); // Import the register and login functions from the authController

// Define POST route at /register.
// Whe a reques arrive here, it call the register function form the controller directly
// CAUTION: no middleware is used, cause this are public routes.
router.post('/register', register);
router.post('/login',login);

module.exports = router;