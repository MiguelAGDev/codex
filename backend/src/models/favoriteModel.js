const pool = require('../config/db');

// getFavoritesByUser retrieves all favorites for a specific user
const getFavoritesByUser = async (userId) => {
    try {
        const [rows] = await pool.query(
            `SELECT fav_id, fav_usr_id, fav_doc_id, fav_created_at
             FROM favorites
             WHERE fav_usr_id = ?
             ORDER BY fav_created_at DESC`,
            [userId]
        );
        return rows;
    } catch (error) {
        throw error;
    }
};

// addFavorite adds a favorite
const addFavorite = async (userId, docId) => {
    try {
        const [result] = await pool.query(
            `INSERT INTO favorites (fav_usr_id, fav_doc_id)
             VALUES (?, ?)`,
            [userId, docId]
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

// removeFavorite removes a favorite
const removeFavorite = async (userId, docId) => {
    try {
        const [result] = await pool.query(
            `DELETE FROM favorites
             WHERE fav_usr_id = ? AND fav_doc_id = ?`,
            [userId, docId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw error;
    }
};

// isFavorite checks if a document is favorited by a user
const isFavorite = async (userId, docId) => {
    try {
        const [rows] = await pool.query(
            `SELECT fav_id FROM favorites
             WHERE fav_usr_id = ? AND fav_doc_id = ?`,
            [userId, docId]
        );
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite,
    isFavorite
};
