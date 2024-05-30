/* eslint-disable no-undef */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
    createdByEmpId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

TaskSchema.plugin(AutoIncrement, {inc_field: 'taskId'});

module.exports = Task = mongoose.model('task', TaskSchema);