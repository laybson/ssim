const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GradeId = Schema.ObjectId;
const Supply = Schema.Types.Mixed;

// Create Schema
const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: GradeId,
        required: true
    },
    returnedSupplies: [Supply],
    receivedSupplies: [Supply]
});

module.exports = Student = mongoose.model('student', StudentSchema);