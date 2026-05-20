const express = require('express');
const router = express.Router();

const {
    getAllDocuments,
    getDocumentById,
    uploadDocument,
    deleteDocument,
    downloadDocument
} = require('../controllers/documentController');

const { verifyToken } = require('../middleware/authMiddleware');
const { checkPermissions } = require('../middleware/authMiddleware');
const { PERMISSIONS } = require('../config/permission');
const upload = require('../middleware/uploadMiddleware');

// GET /documents - Get all documents (public)
router.get('/', getAllDocuments);

// GET /documents/:id - Get a specific document (public)
router.get('/:id', getDocumentById);

// POST /documents/upload - Upload a new document (protected, requires upload permission)
router.post('/upload', verifyToken, checkPermissions(PERMISSIONS.UPLOAD), upload.single('file'), uploadDocument);

// DELETE /documents/:id - Delete a document (protected)
router.delete('/:id', verifyToken, deleteDocument);

// GET /documents/:id/download - Download a document (protected, requires download permission)
router.get('/:id/download', verifyToken, checkPermissions(PERMISSIONS.DOWNLOAD), downloadDocument);

module.exports = router;
