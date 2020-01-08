const express = require('express');
const router = express.Router();

// Student Model
const HistoricalFact = require("../../models/HistoricalFact");

// @route   GET api/historicalFact
// @desc    Get All historical facts
// @access  Public
router.get('/', (req, res) => {
    HistoricalFact.find()
        .sort({'register_date': 'desc'})
        .then(historicalFacts => res.json(historicalFacts))
});

// @route   POST api/historicalFact
// @desc    Create A historical fact
// @access  Public
router.post('/', (req, res) => {
    const newHistoricalFact = new HistoricalFact({
        user: req.body.user,
        student: req.body.student,
        grade: req.body.grade,
    });

    newHistoricalFact.save().then(historicalFact => res.json(historicalFact));
});

module.exports = router;