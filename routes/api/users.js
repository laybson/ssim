const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Get All Users
// @access  Private
router.get('/', auth, (req, res) => {
    User.find()
        .then(users => res.json(users))
});

// @route   DELETE api/users/:id
// @desc    Delete A User
// @access  Private
router.delete('/:id', auth, (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

// @route   POST api/users
// @desc    Edit A User
// @access  Private
router.post('/:id', auth, (req, res) => {
    User.findById(req.body._id).then(user => {        
        if(user) {            
            User.findByIdAndUpdate(
                req.body._id, 
                {
                    $set: 
                    {
                        name: req.body.name,
                        role: req.body.role
                    }
                }
            ).then(user => res.json(user));
        }
    }).catch(err => res.status(404).json({success: false}))
    
});

// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos corretamente'});
    }

    // Check for existing user
    User.findOne({email})
        .then(user => {
            if(user) {
                return res.status(400).json({msg: 'Já existe um usuário cadastrado com esse e-mail'});
            }

            const newUser = new User({
                name, email, password, role:'viewer'
            });

            // Creat salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save().then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err){
                                    throw err;
                                }
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