const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const AssignedTaskSchema = new Schema({
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
    assignedTo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = AssignedTask = mongoose.model('assignedTasks', AssignedTaskSchema);