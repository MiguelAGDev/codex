const {
    getFavoritesByUser,
    addFavorite,
    removeFavorite,
    isFavorite
} = require('../models/favoriteModel');

const { getDocumentById, incrementSaves } = require('../models/documentModel');

// getFavorites retrieves user's favorites
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await getFavoritesByUser(userId);
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// addFavorite adds a document to user's favorites
const addFavorite_handler = async (req, res) => {
    try {
        const { docId } = req.params;
        const userId = req.user.id;

        // Verify document exists
        const document = await getDocumentById(docId);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Check if already favorited
        const alreadyFavorited = await isFavorite(userId, docId);
        if (alreadyFavorited) {
            return res.status(400).json({ error: 'Document is already in favorites' });
        }

        await addFavorite(userId, docId);
        await incrementSaves(docId);

        res.status(201).json({ message: 'Document added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// removeFavorite removes a document from user's favorites
const removeFavorite_handler = async (req, res) => {
    try {
        const { docId } = req.params;
        const userId = req.user.id;

        const removed = await removeFavorite(userId, docId);

        if (!removed) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Document removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getFavorites,
    addFavorite: addFavorite_handler,
    removeFavorite: removeFavorite_handler
};
