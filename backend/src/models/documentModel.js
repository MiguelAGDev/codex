// Author: Miguel Angel Avila Garcia
// Date: 2026-04-26
// Description: SQL queries related to table documents.

// Last Modified: 
// Actions: 

const pool = require('../config/db');

// baseParameters is a string that contains the common columns we want to select from the documents table.
const baseParameters = 
    `
    doc_id, doc_title, doc_author, doc_category, doc_description, 
    doc_filename, doc_upload_by, 
    doc_downloads, doc_saves, 
    doc_created_at, doc_update_at
    `;

// createDocument inserts a new document into the database with the provided title, author, category, description, filename, and uploader ID. It returns the ID of the newly created document.
const createDocument =
    async (title, author, category, description,  filename, uploadBy) =>{

        const [result] = await pool.query(
             `INSERT INTO documents 
                (doc_title, doc_author, doc_category, doc_description, doc_filename, doc_upload_by)
                VALUES (?,?,?,?,?,?)
            `,[title, author, category, description, filename, uploadBy]
        );

        return result.insertId;
}; // end createDocument


// getAllDocuments retrieves all documents from the database, selecting the columns defined in baseParameters and ordering them by creation date in descending order. It returns an array of document objects.
const getAllDocuments = async () => {

    const [rows] = await pool.query(

        `SELECT 
            ${baseParameters}
        FROM documents
        ORDER BY doc_created_at DESC`

    );

    return rows;

};// end getAllDocuments


// getDocumentById retrieves a single document from the database based on its ID. It selects the columns defined in baseParameters and returns the document object if found, or null if no document with the given ID exists.
const getDocumentById = async (docId) =>{

    const [rows] = await pool.query(

        `SELECT 
            ${baseParameters}
        FROM documents
        WHERE doc_id = ?`,
        [docId]
    );

    if(!rows.length)
        return null;
    

    return rows[0];

}; // end getDocumentById


// deleteDocument removes a document from the database based on its ID. It returns true if a document was successfully deleted (i.e., if a document with the given ID existed), or false if no document with that ID was found.
const deleteDocument = async (docId) => {

    const [result] = await pool.query(
        `DELETE FROM documents
        WHERE doc_id = ?`,
        [docId]

    );

    return (result.affectedRows > 0);
}; // end deleteDocument


// incrementDownloads increases the download count of a document by 1 based on its ID. It returns true if the update was successful (i.e., if a document with the given ID exists), or false if no document with that ID was found.
const incrementDownloads = async (docId) => {

    const [result] = await pool.query(
        `UPDATE documents
        SET doc_downloads = doc_downloads + 1
        WHERE doc_id = ?`,
        [docId]
    );

    return result.affectedRows > 0;

}; // end incrementDownloads

// incrementSaves increases the saves count of a document by 1 based on its ID. It returns true if the update was successful, or false if no document with that ID was found.
const incrementSaves = async (docId) => {

    const [result] = await pool.query(
        `UPDATE documents
        SET doc_saves = doc_saves + 1
        WHERE doc_id = ?`,
        [docId]
    );

    return result.affectedRows > 0;

}; // end incrementSaves

// getDocumentsByUploader retrieves all documents uploaded by a specific user based on their uploader ID. It selects the columns defined in baseParameters and returns an array of document objects ordered by creation date in descending order.
const getDocumentsByUploader = async (uploaderId) => {

    const [rows] = await pool.query(
        `SELECT 
            ${baseParameters}
        FROM documents
        WHERE doc_upload_by = ? 
        ORDER BY doc_created_at DESC`,
        [uploaderId]
    );

    return rows;

};

// Exporting all the functions so they can be used in other parts of the application, such as controllers.
module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    deleteDocument,
    incrementDownloads,
    incrementSaves,
    getDocumentsByUploader   
};