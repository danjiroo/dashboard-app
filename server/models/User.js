/* eslint-disable no-undef */
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    registeredDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(AutoIncrement, {inc_field: 'empId'});

module.exports = User = mongoose.model('User', UserSchema);