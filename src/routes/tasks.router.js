const express = require('express');
const Task = require('../models/task');
const taskRouter = express.Router();

taskRouter.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(400).send(err);
    }
});

taskRouter.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch(err ) {
        res.status(500).send(err);
    }

});

taskRouter.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = taskRouter;