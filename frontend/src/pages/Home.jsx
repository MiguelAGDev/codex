import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import './Home.css';

const Home = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('/documents');
                setDocuments(response.data);
            } catch (err) {
                setError('Failed to fetch documents');
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) {
        return <div className="home-container"><p>Loading documents...</p></div>;
    }

    if (error) {
        return <div className="home-container"><p className="error">{error}</p></div>;
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Document Library</h1>
                {(user?.role === 'contributor' || user?.role === 'admin') && (
                    <button className="btn-upload" onClick={() => navigate('/upload')}>
                        Upload Document
                    </button>
                )}
            </div>

            {documents.length === 0 ? (
                <p>No documents available</p>
            ) : (
                <div className="documents-grid">
                    {documents.map((doc) => (
                        <div
                            key={doc.doc_id}
                            className="document-card"
                            onClick={() => navigate(`/documents/${doc.doc_id}`)}
                        >
                            <h3>{doc.doc_title}</h3>
                            <p className="author">by {doc.doc_author}</p>
                            <p className="category">{doc.doc_category}</p>
                            <div className="stats">
                                <span className="downloads">
                                    Downloads: {doc.doc_downloads || 0}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
