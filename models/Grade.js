const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GradeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
});

module.exports = Grade = mongoose.model('grade', GradeSchema);