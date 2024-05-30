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
    console.log('HAHAHAHAHAHAHAHAHAH')
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
router.put('/:id', auth, (req, res) => {
    AssignedTask.findByIdAndUpdate(req.params.id, {title: req.body.title, instruction: req.body.instruction}, function (err, task) {
        if (err) return res.status(500).send('Invalid task ID');
        res.status(200).send(task);
    });
})

// @route   PUT api/assignedTasks
// @desc    Re-Assign a Task to
// @access  Private
router.put('/dev/:id', auth, (req, res) => {
    AssignedTask.findByIdAndUpdate(req.params.id, {assignedTo: req.body.assignedTo, assignedToEmpId: req.body.assignedToEmpId}, function (err, task) {
        if (err) return res.status(500).send('Invalid task ID');
        res.status(200).send(task);
    });
})

// @route   DELETE api/assignedTasks
// @desc    Remove Assigned Task
// @access  Private
router.delete('/:id', auth, (req, res) => {
    AssignedTask.findById(req.params.id)
        .then(task => task.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
})

module.exports = router;