import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // On mount, read token from localStorage and decode it
    useEffect(() => {
        const savedToken = localStorage.getItem('codex_token');
        if (savedToken) {
            setToken(savedToken);
            try {
                // JWT format: header.payload.signature
                // We need to decode the payload (second part)
                const parts = savedToken.split('.');
                if (parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1]));
                    setUser({
                        id: payload.id,
                        role: payload.role
                    });
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('codex_token');
                setToken(null);
                setUser(null);
            }
        }
    }, []);

    const login = (newToken) => {
        localStorage.setItem('codex_token', newToken);
        setToken(newToken);
        
        try {
            const parts = newToken.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1]));
                setUser({
                    id: payload.id,
                    role: payload.role
                });
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('codex_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
