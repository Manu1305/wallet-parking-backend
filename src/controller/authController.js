const { registerUser, loginUser } = require('../services/authService');

const register = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }
        const user = await registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = await loginUser(req.body);
        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
