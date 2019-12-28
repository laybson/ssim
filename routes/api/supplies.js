const express = require('express');
const router = express.Router();

// Supply Model
const Supply = require("../../models/Supply");

// @route   GET api/supplies
// @desc    Get All Supplies
// @access  Public
router.get('/', (req, res) => {
    Supply.find()
        .then(supplies => res.json(supplies))
});

// @route   POST api/supplies
// @desc    Create A Supply
// @access  Public
router.post('/', (req, res) => {
    const newSupply = new Supply({
        name: req.body.name,
        grade: req.body.grade
    });

    newSupply.save().then(supply => res.json(supply));
});

// @route   DELETE api/supplies/:id
// @desc    Delete A Supply
// @access  Public
router.delete('/:id', (req, res) => {
    Supply.findById(req.params.id)
        .then(supply => supply.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;