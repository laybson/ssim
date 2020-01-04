const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = Schema.Types.Mixed;
const Student = Schema.Types.Mixed;
const Grade = Schema.Types.Mixed;

// Create Schema
const HistoricalFactSchema = new Schema({
    user: {
        type: User,
        required: true
    },
    student: {
        type: Student,
        required: true
    },
    grade: {
        type: Grade,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = HistoricalFact = mongoose.model('historicalFact', HistoricalFactSchema);