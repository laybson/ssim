const express = require('express');
const router = express.Router();

// Student Model
const Student = require("../../models/Student");

// @route   GET api/students
// @desc    Get All Students
// @access  Public
router.get('/', (req, res) => {
    Student.find()
        .then(students => res.json(students))
});

// @route   POST api/students
// @desc    Create A Student
// @access  Public
router.post('/', (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        grade: req.body.grade
    });

    newStudent.save().then(student => res.json(student));
});

// @route   DELETE api/students/:id
// @desc    Delete A Student
// @access  Public
router.delete('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(supply => supply.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;