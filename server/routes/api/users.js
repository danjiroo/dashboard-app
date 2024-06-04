/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/User');

// @route   GET api/auth/user
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        // .sort({ name: 1})
        .select('-password')
        .then(users => res.json(users));
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password, role, birth, gender } = req.body;

    // validation
    if(!name || !email || !password || !role || !gender || !birth) {
        return res.status(400).json({ msg: 'Please input all fields!' });
    }

    // check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists.' });// wala na ni pero wala lang sa nako gi comment

            const newUser = new User({
                name,
                email,
                password,
                role,
                birth,
                gender
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
                                        user: {
                                            token,
                                            _id: user._id,
                                            name: user.name,
                                            email: user.email,
                                            role: user.role,
                                            birth: user.birth,
                                            gender: user.gender
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
});

// @route   PUT api/users
// @desc    Modify a user
// @access  Private
router.put('/:id', auth, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 
        email: req.body.email, 
        role: req.body.role,
        birth: req.body.birth,
        gender: req.body.gender
    }, function (err, user) {
        if (err) return res.status(500).send('Invalid user ID');
        res.status(200).send(user);
    });
})

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'Deleting User Error' });
        });
})

module.exports = router;