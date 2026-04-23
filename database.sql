
-- Author: Miguel Angel Avila Garcia
-- Date: 2026-04-21
-- Description: Initialization script for the "codex" database. 
--              Defines the core schema with tables for roles, 
--              users, documents, comments, and favorites, including 
--              foreign key relationships and uniqueness constraints. 
--              Also inserts initial roles with different permission levels.

-- Last Modified: 
-- Actions: 

CREATE DATABASE IF NOT EXISTS codex;

USE codex;

CREATE TABLE roles (

    rol_id INT AUTO_INCREMENT PRIMARY KEY,
    rol_name VARCHAR(50) NOT NULL UNIQUE,
    rol_permissions INT NOT NULL,


    rol_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users(

    usr_id INT AUTO_INCREMENT PRIMARY KEY,
    usr_name VARCHAR(255) NOT NULL,
    usr_email VARCHAR(255) NOT NULL UNIQUE,
    usr_password VARCHAR(255) NOT NULL,
    usr_rol_id INT NOT NULL,
    usr_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usr_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (usr_rol_id) REFERENCES roles(rol_id)

);

CREATE TABLE documents(

    doc_id INT AUTO_INCREMENT PRIMARY KEY,
    doc_title VARCHAR(200) NOT NULL,
    doc_author VARCHAR(100) NOT NULL DEFAULT 'Desconocido',
    doc_category VARCHAR(100) NOT NULL DEFAULT 'General',
    doc_filename VARCHAR(255) NOT NULL,
    doc_upload_by INT NOT NULL,
    doc_downloads INT NOT NULL DEFAULT 0,
    doc_saves INT NOT NULL DEFAULT 0,
    doc_update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    doc_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (doc_upload_by) REFERENCES users(usr_id)

);

CREATE TABLE comments(

    com_id INT AUTO_INCREMENT PRIMARY KEY,
    com_doc_id INT NOT NULL,
    com_usr_id INT NOT NULL,
    com_text VARCHAR(500) NOT NULL,
    com_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (com_doc_id) REFERENCES documents(doc_id),
    FOREIGN KEY (com_usr_id) REFERENCES users(usr_id)

);

CREATE TABLE favorites (

    fav_id INT AUTO_INCREMENT PRIMARY KEY,
    fav_usr_id INT NOT NULL,
    fav_doc_id INT NOT NULL,
    fav_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fav_usr_id) REFERENCES users(usr_id),
    FOREIGN KEY (fav_doc_id) REFERENCES documents(doc_id)

);

INSERT INTO roles (rol_name, rol_permissions) 
VALUES
('viewer', 0x003),
('contributor', 0x03F),
('admin', 0x1FF);
