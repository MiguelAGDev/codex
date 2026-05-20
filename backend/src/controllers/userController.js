const {
    getUserById,
    updateUser
} = require('../models/userModel');

// getProfile returns the current user's profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Don't send password
        res.status(200).json({
            usr_id: user.usr_id,
            usr_name: user.usr_name,
            usr_email: user.usr_email,
            usr_rol_id: user.usr_rol_id,
            usr_created_at: user.usr_created_at,
            usr_updated_at: user.usr_updated_at
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// updateProfile updates the user's name and email
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        const updated = await updateUser(userId, name, email);

        if (!updated) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getProfile,
    updateProfile
};
