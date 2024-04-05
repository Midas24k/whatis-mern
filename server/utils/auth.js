// Import the jsonwebtoken package
const jwt = require('jsonwebtoken');

// Set the secret key for the token and its expiration time
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function for routes that require authentication
  authMiddleware: function (req, res, next) {
    // Allow the token to be sent via the query string or the authorization header
    let token = req.query.token || req.headers.authorization;

    // If the token is sent via the authorization header, extract the actual token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is provided, throw an error
    if (!token) {
     throw new Error ( 'You have no token!' );
    }

    // Verify the token and extract the user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // If the token is invalid, log an error and throw an error
      console.log('Invalid token');
      throw new Error('invalid token!');
    }

    // Proceed to the next middleware or route handler
    return req;
  },
  // Function to generate a token for a user
  signToken: function ({ username, email, _id }) {
    // Define the payload of the token
    const payload = { username, email, _id };

    // Generate and return the token
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};