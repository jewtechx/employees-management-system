const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { pool } = require('../models/model.employees');
const dotenv = require('dotenv');
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Use req.headers.authorization

            const decoded = jwt.verify(token, process.env.JWT);

            const { rows: admin } = await pool.query('SELECT id,name,email FROM admin WHERE id = $1', [decoded.id]); // Add await

            req.user = admin[0]; // Assign the admin data to req.user

            next(); // Call next to continue with the next middleware or route handler
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error('Not authorized');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
});

module.exports = { protect };
