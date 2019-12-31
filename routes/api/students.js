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

// @route   GET api/students/grade/:id
// @desc    Get All grade students
// @access  Public
router.get('/grade/:id', (req, res) => {
    Student.find({ grade: req.params.id })
        .then(students => res.json(students))
});

// @route   POST api/students
// @desc    Create A Student
// @access  Public
router.post('/', (req, res) => {
    Student.findById(req.body._id).then(student => {        
        if(student) {            
            Student.findByIdAndUpdate(
                req.body._id, 
                {
                    $set: 
                    {
                        returnedSupplies: req.body.returnedSupplies,
                        receivedSupplies: req.body.receivedSupplies
                    }
                }
            ).then(student => res.json(student));
        } else {
            const newStudent = new Student({
                name: req.body.name,
                grade: req.body.grade
            });
        
            newStudent.save().then(student => res.json(student));
        }
    })
    
});

// @route   DELETE api/students/:id
// @desc    Delete A Student
// @access  Public
router.delete('/:id', (req, res) => {
    Student.findById(req.params.id)
        .then(student => student.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
});

module.exports = router;