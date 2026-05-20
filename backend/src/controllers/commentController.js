const {
    getCommentsByDocument,
    getCommentById,
    createComment,
    deleteComment
} = require('../models/commentModel');

const { getDocumentById } = require('../models/documentModel');

// getComments retrieves all comments for a document
const getComments = async (req, res) => {
    try {
        const { docId } = req.params;
        const comments = await getCommentsByDocument(docId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// addComment creates a new comment
const addComment = async (req, res) => {
    try {
        const { docId } = req.params;
        const { text } = req.body;
        const userId = req.user.id;

        if (!text) {
            return res.status(400).json({ error: 'Comment text is required' });
        }

        // Verify document exists
        const document = await getDocumentById(docId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        const commentId = await createComment(docId, userId, text);

        res.status(201).json({
            message: 'Comment added successfully',
            com_id: commentId
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// deleteComment removes a comment
const deleteComment_handler = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await getCommentById(id);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if user is the owner or has admin role
        const isOwner = comment.com_usr_id === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await deleteComment(id);

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getComments,
    addComment,
    deleteComment: deleteComment_handler
};
