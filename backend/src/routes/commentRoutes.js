const express = require('express');
const router = express.Router();

const {
    getComments,
    addComment,
    deleteComment
} = require('../controllers/commentController');

const { verifyToken } = require('../middleware/authMiddleware');

// GET /comments/:docId - Get all comments for a document (public)
router.get('/:docId', getComments);

// POST /comments/:docId - Add a comment to a document (protected)
router.post('/:docId', verifyToken, addComment);

// DELETE /comments/:id - Delete a comment (protected)
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
