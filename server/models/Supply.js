const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GradeId = Schema.ObjectId;

// Create Schema
const SupplySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: GradeId,
        required: true
    }
});

module.exports = Supply = mongoose.model('supply', SupplySchema);