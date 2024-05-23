const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    // Log the token for debugging
    console.log('Received token:', token);
  
    if (token == null) {
      req.user = null;
      next();
    } else {
      try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
  
        // Log the decoded token for debugging
        console.log('Decoded token:', decodedToken);
  
        req.user = decodedToken._id;
      } catch (error) {
        console.error('Error verifying token:', error);
        req.user = null;
      }
      next();
    }
  };
