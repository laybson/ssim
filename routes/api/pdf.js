const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');

const pdfTemplate = require('../../documents');

// @route   GET api/pdf
// @desc    Get PDF
// @access  Public
router.get('/', (req, res) => {    
    res.sendFile(`${__dirname}/result.pdf`)
});

// @route   POST api/pdf
// @desc    Create A PDF
// @access  Public
router.post('/', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('routes/api/result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve());
    })
});

module.exports = router;