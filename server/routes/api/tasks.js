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
router.put('/:id', auth, async (req, res) => {
    const { title, instruction } = req.body;

    try {
        const task = await AssignedTask.findByIdAndUpdate(
            req.params.id,
            { title, instruction },
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!task) {
            return res.status(404).send('Task not found');
        }

        res.status(200).send(task);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/tasks
// @desc    Delete a Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ success: false, message: 'Task not found' });
            }
            console.log('unassigned task:::', task);
            res.json({ success: true });
        })
        .catch(err => {
            console.error('error in unassigning task', err);
            res.status(500).json({ success: false, error: 'Deleting Task Error' });
        });
})

module.exports = router;