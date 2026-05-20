const pool = require('../config/db');

// getCommentsByDocument retrieves all comments for a specific document
const getCommentsByDocument = async (docId) => {
    try {
        const [rows] = await pool.query(
            `SELECT com_id, com_doc_id, com_usr_id, com_text, com_created_at
             FROM comments
             WHERE com_doc_id = ?
             ORDER BY com_created_at DESC`,
            [docId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

// getCommentById retrieves a single comment by ID
const getCommentById = async (id) => {
    try {
        const [rows] = await pool.query(
            `SELECT com_id, com_doc_id, com_usr_id, com_text, com_created_at
             FROM comments
             WHERE com_id = ?`,
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw error;
    }
};

// createComment creates a new comment
const createComment = async (docId, userId, text) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO comments (com_doc_id, com_usr_id, com_text)
             VALUES (?, ?, ?)`,
            [docId, userId, text]
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

// deleteComment removes a comment by ID
const deleteComment = async (id) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM comments
             WHERE com_id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCommentsByDocument,
    getCommentById,
    createComment,
    deleteComment
};
