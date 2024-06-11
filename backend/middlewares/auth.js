const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // Extract token from cookies
  let token = req.cookies?.uid;
  console.log("Token from cookie:", token);

  // Fallback to Authorization header if token is not in cookies
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length); // Remove 'Bearer ' prefix
    }
  }
  
  console.log("Final token:", token);

  // If token is still not available, return unauthorized error
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  // Get user from token
  const user = getUser(token);
  console.log("User from token:", user);

  // If user is not found, return unauthorized error
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // Attach user to request object and proceed
  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  let token = req.cookies?.uid;

  // Check for token in Authorization header if not found in cookies
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length); // Remove 'Bearer ' prefix
    }
  }
   const user = getUser(token);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
