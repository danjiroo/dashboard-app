/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// AssignedTask Model
const AssignedTask = require('../../models/AssignedTask');

// @route   GET api/assignedTasks
// @desc    Get All Assigned Tasks
// @access  Public
router.get('/', (req, res) => {
    return AssignedTask.find()
        .sort({ date: -1})
        .then(assignedTasks => res.json(assignedTasks));
});

// @route   POST api/assignedTasks
// @desc    Assign a Task to
// @access  Private
router.post('/', auth, (req, res) => {
    const newAssignedTask = new AssignedTask({
        title: req.body.title,
        instruction: req.body.instruction,
        createdBy: req.body.createdBy,
        createdByEmpId: req.body.createdByEmpId,
        assignedTo: req.body.assignedTo,
        assignedToEmpId: req.body.assignedToEmpId,
        date: req.body.date,
        taskId: req.body.taskId
    });

    newAssignedTask.save().then(assignedTask => res.json(assignedTask));
});

// @route   PUT api/tasks
// @desc    Modify an assigned task
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
            return res.status(404).send('Assigned Task not found');
        }

        res.status(200).send(task);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/assignedTasks
// @desc    Re-Assign a Task to
// @access  Private
router.put('/dev/:id', auth, async (req, res) => {
    const { assignedTo, assignedToEmpId } = req.body;

    try {
        const task = await AssignedTask.findByIdAndUpdate(
            req.params.id,
            { assignedTo, assignedToEmpId },
            { new: true, runValidators: true } // new: true returns the updated document
        );

        if (!task) {
            return res.status(404).send('Assigned Task not found - Dev');
        }

        res.status(200).send(task);
    } catch (err) {
        console.error('Error updating task - Dev Assigned to:', err);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/assignedTasks
// @desc    Remove Assigned Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
    AssignedTask.findByIdAndDelete(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).json({ success: false, message: 'Assigned Task not found' });
            }
            res.json({ success: true });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: 'Deleting Assigned Task Error' });
        });
});

module.exports = router;