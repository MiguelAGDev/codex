const express = require('express');
const router = express.Router();

const {
    getProfile,
    updateProfile
} = require('../controllers/userController');

const { verifyToken } = require('../middleware/authMiddleware');

// GET /users/profile - Get user's profile (protected)
router.get('/profile', verifyToken, getProfile);

// PUT /users/profile - Update user's profile (protected)
router.put('/profile', verifyToken, updateProfile);

module.exports = router;
