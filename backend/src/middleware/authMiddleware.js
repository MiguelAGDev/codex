// Author: Miguel Angel Avila Garcia
// Date: 2026-04-23
// Description: This file defines two middleware functions for authentication and authorization in an Express application. The verifyToken function checks for a valid JWT token in the Authorization header of incoming requests, while the checkPermissions function checks if the authenticated user has the required permissions to access a specific route. These middleware functions can be used to protect routes and ensure that only authorized users can access certain resources or perform specific actions.

// Last Modified: 
// Actions: 

const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for handling JWTs
const {PERMISSIONS} = require('../config/permissions'); // Import the persmissions

// Middleware function to verify the JWT token sent in the Authorization header of the request.
const verifyToken = (req, res, next) =>{

    // The client should send the token in the Authorization header in the format: 'Bearer <token>'
    const authHeader = req.headers['authorization']; // Get the Authorization header from the request

    // Check if the Authorization header is present and starts with 'Bearer '. If not, return a 401 Unauthorized response.
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: 'No token provided'});
    }

    // split cuts the string into an array of two elements: ['Bearer', '<token>']. We take the second element (index 1) which is the actual token.
    const token = authHeader.split(' ')[1]; // Extract the token from the header

    try{
        //Verify the token signature. If the token was tampered with or is expired, this will throw an error. If the token is valid, it returns the decoded payload (the user information we encoded when we created the token).
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user information to the request object for use in subsequent middleware or route handlers
        next();

    }catch(err){
        return res.status(401).json({error: 'Invalid token or expired'}); // If the token is invalid, return a 401 Unauthorized response
    }


};

// This function return another function. This pattern is called a higher order function
// We need it cause middleware function only accept (req, res, next) - but also need to 
// pass in which permission we want to check. 
// The outer function receives the permission, the inner funcition is the actual middleware.

// it is use like this: 
/**
    router.post('/upload', verifyToken, 
            checkPermission(PERMISSIONS.UPLOAD), 
            documentController.upload)
 */

const checkPermissions = (requiredPermission) => {

    return(req, res, next) => {

        const userRole = req.user.role; // Get the user's role from the request object (set by verifyToken middleware)
        
        if((userRole & requiredPermission) == 0){

            // If the user does not have the required permission, return a 403 Forbidden response            
            return res.status(403).json({error: 'Access denied'}); 

        };

        next(); // If the user has the required permission, proceed to the next middleware or route handler
    };
    

};

module.exports = {verifyToken, checkPermissions}; // Export the middleware functions for use in other parts of the application