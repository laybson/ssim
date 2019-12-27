const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GradeId = Schema.ObjectId;
const SupplyId = Schema.ObjectId;

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
    returnedSupplies: [SupplyId]
});

module.exports = Student = mongoose.model('student', StudentSchema);