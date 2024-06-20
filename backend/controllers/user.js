const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const user = await User.create({ name, email, password });
        //console.log('User signed up:', user); // Debugging statement
        return res.json(user); // Return the created user
    } catch (error) {
        console.error('Error signing up user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = setUser(user);
        if (!token) {
            return res.status(500).json({ error: 'Token generation failed' }); // Debugging statement
        }
        console.log('Generated token:', token); // Debugging statement
        res.cookie('uid', token, { httpOnly: true }); // Ensure httpOnly is set for security

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};
