import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import './DocumentDetail.css';

const DocumentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [document, setDocument] = useState(null);
    const [comments, setComments] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docResponse = await axios.get(`/documents/${id}`);
                setDocument(docResponse.data);

                const commentsResponse = await axios.get(`/comments/${id}`);
                setComments(commentsResponse.data);
            } catch (err) {
                setError('Failed to fetch document');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDownload = async () => {
        try {
            const response = await axios.get(`/documents/${id}/download`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', document.doc_filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            setError('Failed to download document');
        }
    };

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`/favorites/${id}`);
            } else {
                await axios.post(`/favorites/${id}`);
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            setError('Failed to update favorite');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            await axios.post(`/comments/${id}`, { text: commentText });
            setCommentText('');
            
            // Refresh comments
            const response = await axios.get(`/comments/${id}`);
            setComments(response.data);
        } catch (err) {
            setError('Failed to add comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/comments/${commentId}`);
            setComments(comments.filter(c => c.com_id !== commentId));
        } catch (err) {
            setError('Failed to delete comment');
        }
    };

    if (loading) {
        return <div className="doc-detail-container"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="doc-detail-container"><p className="error">{error}</p></div>;
    }

    if (!document) {
        return <div className="doc-detail-container"><p>Document not found</p></div>;
    }

    return (
        <div className="doc-detail-container">
            <button className="btn-back" onClick={() => navigate('/')}>← Back</button>

            <div className="doc-header">
                <div className="doc-info">
                    <h1>{document.doc_title}</h1>
                    <p className="doc-author">by {document.doc_author}</p>
                    <p className="doc-category">{document.doc_category}</p>
                </div>

                <div className="doc-actions">
                    <button className="btn-download" onClick={handleDownload}>
                        ↓ Download ({document.doc_downloads || 0})
                    </button>
                    <button 
                        className={`btn-favorite ${isFavorite ? 'active' : ''}`}
                        onClick={toggleFavorite}
                    >
                        ♡ {document.doc_saves || 0}
                    </button>
                </div>
            </div>

            <div className="comments-section">
                <h2>Comments</h2>

                {user && (
                    <form className="comment-form" onSubmit={handleAddComment}>
                        <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            rows="3"
                        />
                        <button type="submit" className="btn-comment">Post Comment</button>
                    </form>
                )}

                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p className="no-comments">No comments yet</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment.com_id} className="comment-item">
                                <div className="comment-header">
                                    <span className="comment-user">User {comment.com_usr_id}</span>
                                    <span className="comment-date">
                                        {new Date(comment.com_created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="comment-text">{comment.com_text}</p>
                                {user && user.id === comment.com_usr_id && (
                                    <button
                                        className="btn-delete-comment"
                                        onClick={() => handleDeleteComment(comment.com_id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DocumentDetail;
