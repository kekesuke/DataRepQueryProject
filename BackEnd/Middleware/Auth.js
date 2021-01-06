const jwt = require('jsonwebtoken')
const config = require('config')


function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user from payload
    req.user = decoded;
    next();// it will call the next piece of the middleware 
  } catch (e) {
    res.status(400).json({ msg: 'The token is invalid' });
  }
};

module.exports = auth;