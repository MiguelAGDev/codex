// Author: Miguel Angel Avila Garcia
// Date: 2026-04-26
// Description: This file defines the document controller for our Express application. It contains functions that handle HTTP requests related to document management.

// Last Modified: 
// Actions: 

const {
    createDocument, 
    getAllDocuments, 
    getDocumentById, 
    deleteDocument, 
    incrementDownloads,
    incrementSaves,
    getDocumentsByUploader
} = require('../models/documentModel');

const { PERMISSIONS } = require('../config/permission');

const fs = require('fs').promises;
const path = require('path');

const getAllDocuments = async (req, res) => {
    try {
        const documents = await getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await getDocumentById(id);
        
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file was uploaded' });
        }

        const { title, author, category } = req.body;

        if (!title) {
            await fs.unlink(req.file.path);
            return res.status(400).json({ error: 'Title is required' });
        }

        const filename = req.file.filename;
        const uploadedBy = req.user.id;

        const docId = await createDocument(title, author, category, filename, uploadedBy);

        res.status(201).json({ 
            message: 'Document uploaded successfully',
            doc_id: docId
        });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await getDocumentById(id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Check if user is the owner or has admin role
        const isOwner = document.doc_upload_by === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Forbidden' });
        }

        await deleteDocument(id);

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await getDocumentById(id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await incrementDownloads(id);

        const filePath = path.join(__dirname, '../../uploads', document.doc_filename);
        res.download(filePath, document.doc_filename);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllDocuments,
    getDocumentById,
    uploadDocument,
    deleteDocument,
    downloadDocument
};


