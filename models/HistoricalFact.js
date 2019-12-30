const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GradeId = Schema.ObjectId;
const SupplyId = Schema.ObjectId;
const UserId = Schema.ObjectId;
const StudentId = Schema.ObjectId;

// Create Schema
const HistoricalFact = new Schema({
    user: {
        type: UserId,
        required: true
    },
    grade: {
        type: GradeId,
        required: true
    },
    student: {
        type: StudentId,
        required: true
    },
    supplies: [SupplyId],
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = HistoricalFact = mongoose.model('historicalFact', HistoricalFactSchema);