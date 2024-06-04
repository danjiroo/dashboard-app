/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate user / Login
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please input all fields!' });
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'User does not exist.' });

            // password validation
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid password.'});
                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    _id: user._id,
                                    name: user.name,
                                    email: user.email,
                                    role: user.role,
                                    empId: user.empId
                                }
                            })
                        }
                    )
                })
        })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;