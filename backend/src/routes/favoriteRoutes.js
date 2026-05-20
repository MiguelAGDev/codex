const express = require('express');
const router = express.Router();

const {
    getFavorites,
    addFavorite,
    removeFavorite
} = require('../controllers/favoriteController');

const { verifyToken } = require('../middleware/authMiddleware');

// GET /favorites - Get user's favorites (protected)
router.get('/', verifyToken, getFavorites);

// POST /favorites/:docId - Add a document to favorites (protected)
router.post('/:docId', verifyToken, addFavorite);

// DELETE /favorites/:docId - Remove a document from favorites (protected)
router.delete('/:docId', verifyToken, removeFavorite);

module.exports = router;
