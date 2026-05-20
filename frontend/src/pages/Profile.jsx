import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile');
                setName(response.data.usr_name);
                setEmail(response.data.usr_email);
            } catch (err) {
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setUpdating(true);

        try {
            await axios.put('/users/profile', { name, email });
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="profile-container"><p>Loading profile...</p></div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-box">
                <h1>My Profile</h1>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={updating} className="btn-primary">
                        {updating ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
