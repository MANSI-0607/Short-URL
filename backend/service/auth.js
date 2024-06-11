const jwt = require("jsonwebtoken");
const secret = "mansi@123";

function setUser(user) {
    //console.log('Creating token for user:', user); // Debugging statement
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret); // user is going as payload
}

function getUser(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret);
        console.log('Decoded token:', decoded); // Debugging statement
        return decoded;
    } catch (err) {
        console.error('Token verification failed:', err); // Debugging statement
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
