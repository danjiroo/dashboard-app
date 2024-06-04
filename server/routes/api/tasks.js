/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Task Model
const Task = require('../../models/Task');

// @route   GET api/tasks
// @desc    Get All Tasks
// @access  Public
router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1})
        .then(tasks => {
            return res.json(tasks)
        });
});

// @route   POST api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        instruction: req.body.instruction,
        createdBy: req.body.createdBy,
        createdByEmpId: req.body.createdByEmpId,
        date: req.body.date
    });

    newTask.save().then(task => res.json(task));
});

// @route   PUT api/tasks
// @desc    Modify a task
// @access  Private
router.put('/:id', auth, (req, res) => {
    Task.findByIdAndUpdate(req.params.id, {title: req.body.title, instruction: req.body.instruction}, function (err, task) {
        if (err) return res.status(500).send('Invalid task ID');
        res.status(200).send(task);
    });
})

// @route   DELETE api/tasks
// @desc    Delete a Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Task.findById(req.params.id)
        .then(task => task.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;