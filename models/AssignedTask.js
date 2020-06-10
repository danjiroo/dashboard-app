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
    createdByEmpId: {
        type: Number,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    assignedToEmpId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    taskId: {
        type: Number,
        required: true
    }
});

module.exports = AssignedTask = mongoose.model('assignedTasks', AssignedTaskSchema);