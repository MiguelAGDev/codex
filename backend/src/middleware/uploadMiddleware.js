// Author: Miguel Angel Avila Garcia
// Date: 2026-04-26
// Description: This file configures the Multer middleware for handling file uploads in our Express application. It defines how uploaded files should be stored on the server, what types of files are allowed, and the maximum file size. The configured Multer instance is then exported for use in our routes to handle document uploads.

// Last Modified: 
// Actions: 

// Multer is a middleware for express taht handles: 
//  * upload files from frontend
//  * manage dorms 'multipart/form-data' (the type of form used for file uploads)
//  * save files in the server
const multer = require('multer');


// Path is a library that to worj whit file routes and directories a portable and secure way.
const path = require('path');


// destination: called once per iploat to decide the folder
// req - HTTP request object
// file - information about the upload file (name, size, ...)
// cb - "callback" function you MUST call when you are don.
//       cb(error, folderPath) -> nulls mean no error 
const destination =  (req, file, cb) => {

    cb(null, path.join(__dirname, '../../uploads'));

};

// filename: called once per file to decide the name of the file in the server
// req - HTTP request object
// file - information about the upload file (name, size, ...)
// cb - "callback" function you MUST call when you are don.
//       cb(error, filename) -> nulls mean no error
const filename = (req, file, cb) => {

    const uniqueFile = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueFile);

};

// storage is the configuration object that tells multer where to save the files and how to name them.
const storage = multer.diskStorage({destination, filename});

// fileFilter is a function that multer calls for each uploaded file to decide whether to accept it or reject it.
// req - HTTP request object
// file - information about the upload file (name, size, ...)
// cb - "callback" function you MUST call when you are don.
//       cb(error, acceptFile) -> null means no error, acceptFile is true or false
const fileFilter = (req, file, cb) => {

    const isPDF = 
        file.mimetype === 'application/pdf' &&
        path.extname(file.originalname).toLowerCase() === 'pdf';

    if(isPDF)
        cb(null, true);
    else
        cb(new Error('Only PDF files are allowed', false))

};

// upload is the multer instance configured with our storage, fileFilter, and limits (max file size 10MB).
// We will use this upload middleware in our routes to handle file uploads.
// limits is an object that specifies the maximum file size allowed for uploads. In this case, we set it to 10MB (10 * 1024 * 1024 bytes).
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});


// Exporting the upload middleware so it can be used in our routes to handle file uploads.
module.exports = upload;






