import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './Upload.css';

const Upload = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError('');
        } else {
            setError('Please select a valid PDF file');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!title || !author || !category || !file) {
            setError('All fields are required');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('category', category);
            formData.append('file', file);

            await axios.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-box">
                <h1>Upload Document</h1>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Document Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter document title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input
                            id="author"
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input
                            id="category"
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Enter document category"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="file">PDF File</label>
                        <input
                            id="file"
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                        {file && <p className="file-name">Selected: {file.name}</p>}
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? 'Uploading...' : 'Upload Document'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
