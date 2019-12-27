const express = require('express');
const router = express.Router();

// Grade Model
const Grade = require("../../models/Grade");

// @route   GET api/grades
// @desc    Get All Grades
// @access  Public
router.get('/', (req, res) => {
    Grade.find()
        .then(grades => res.json(grades))
});

// @route   POST api/grades
// @desc    Create A Grade
// @access  Public
router.post('/', (req, res) => {
    const newGrade = new Grade({
        name: req.body.name,
        shift: req.body.shift
    });

    newGrade.save().then(grade => res.json(grade));
});

// @route   DELETE api/grades/:id
// @desc    Delete A Grade
// @access  Public
router.delete('/:id', (req, res) => {
    Grade.findById(req.params.id)
        .then(supply => supply.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;