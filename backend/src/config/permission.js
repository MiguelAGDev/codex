// Author: Miguel Angel Avila Garcia
// Date: 2026-04-21
// Description: Permission configuration file that defines user roles and their associated permissions. This can be used to control access to different parts of the application based on the user's role.

// Last Modified: 
// Actions: 

const PERMISSIONS = {

    LOGIN:                          0x001, // Permission to log in to the application
    VIEW_DOCUMENTS:                 0x002, // Permission to view documents
    UPLOAD:                         0x004, // Permission to upload documents
    DOWNLOAD:                       0x008, // Permission to download documents
    EDIT_OWN:                       0x010, // Permission to edit own documents
    DELETE_OWN:                     0x020, // Permission to delete own documents
    EDIT_ANY:                       0x040, // Permission to edit any document
    DELETE_ANY:                     0x080, // Permission to delete any document
    MANAGE_USERS:                   0x100, // Permission to manage user accounts
};

const ROLES = {

    VIEWER: PERMISSIONS.LOGIN | PERMISSIONS.VIEW_DOCUMENTS | PERMISSIONS.DOWNLOAD, // Can log in, view and download documents
    CONTRIBUTOR: PERMISSIONS.LOGIN | PERMISSIONS.VIEW_DOCUMENTS | PERMISSIONS.DOWNLOAD | PERMISSIONS.UPLOAD | PERMISSIONS.EDIT_OWN | PERMISSIONS.DELETE_OWN, // Can do everything a viewer can, plus upload and manage their own documents
    ADMIN: 0x1FF // Can do everything

};

module.exports = { PERMISSIONS, ROLES };