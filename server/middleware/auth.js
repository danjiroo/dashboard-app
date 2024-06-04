/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // check token
    if(!token) return res.status(401).json({ msg: 'Authorization denied.'});

    try {
        // verify if nay token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
        // add user from token
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({ msg: 'Invalid token.'});
    }
   
}

module.exports = auth;