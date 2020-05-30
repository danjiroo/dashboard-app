const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Task = mongoose.model('task', TaskSchema);