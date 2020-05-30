const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// Item Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password, role } = req.body;

    // validation
    if(!name || !email || !password || !role) {
        return res.status(400).json({ msg: 'Please input all fields!' });
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists.' });

            const newUser = new User({
                name,
                email,
                password,
                role
            })

            // salt and hash pass
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            role: user.role
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

module.exports = router;