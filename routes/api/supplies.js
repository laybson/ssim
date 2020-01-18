const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Supply Model
const Supply = require("../../models/Supply");

// @route   GET api/supplies
// @desc    Get All Supplies
// @access  Public
router.get('/', (req, res) => {
    Supply.find()
        .then(supplies => res.json(supplies))
});

// @route   GET api/supplies/grade/:id
// @desc    Get All grade supplies
// @access  Public
router.get('/grade/:id', (req, res) => {
    Supply.find({ grade: req.params.id })
        .then(supplies => res.json(supplies))
});

// @route   POST api/supplies
// @desc    Create A Supply
// @access  Private
router.post('/', auth, (req, res) => {
    const { name } = req.body;

    if(!name){
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos corretamente'});
    }

    const newSupply = new Supply({
        name: req.body.name,
        grade: req.body.grade,
        quantity: req.body.quantity,
        didactic: req.body.didactic
    });

    newSupply.save().then(supply => res.json(supply));
});

// @route   POST api/supplies
// @desc    Edit A Supply
// @access  Private
router.post('/:id', auth, (req, res) => {
    console.log('req.body:',req.body)
    Supply.findById(req.body._id).then(supply => {        
        if(supply) {            
            Supply.findByIdAndUpdate(
                req.body._id, 
                {
                    $set: 
                    {
                        name: req.body.name,
                        quantity: req.body.quantity,
                        didactic: req.body.didactic
                    }
                }
            ).then(supply => res.json(supply));
        }
    }).catch(err => res.status(404).json({success: false}))
    
});

// @route   DELETE api/supplies/:id
// @desc    Delete A Supply
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Supply.findById(req.params.id)
        .then(supply => supply.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;