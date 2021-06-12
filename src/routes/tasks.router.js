const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth.middleware');
const taskRouter = express.Router();

taskRouter.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch(err) {
        res.status(400).send(err);
    }
});

taskRouter.patch("/tasks/:id", auth, async (req, res) => {
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdatesField = ["description", "completed"];
    const isAllowedUpdatesOp = updates.every(update => allowedUpdatesField.includes(update));

    if(!isAllowedUpdatesOp) {
        return res.status(400).send({error: 'Invalid update operation!'});
    }
    
    try {
        const task = await Task.findOne({_id, owner: req.user._id });
        
        if(!task)
            return res.status(404).send();

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }  
});

//GET /tasks?completed=true
//GET /tasks?limit=2&skip=2
//GET /tasks?sortBy=createdAt_desc
taskRouter.get('/tasks', auth, async (req, res) => {
    try {
        const match = {};
        const sort = {};

        if(req.query.completed)
            match.completed = req.query.completed === 'true';

        if(req.query.sortBy) {
            const parts = req.query.sortBy.split('_');
            sort[parts[0]] = req.query.sortBy === 'desc' ? -1 : 1;
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            },
        }).execPopulate();
        res.send(req.user.tasks);
    } catch(err ) {
        console.log(err);
        res.status(500).send(err);
    }

});

taskRouter.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        console.log(req.user._id )
        const task = await Task.findOne({ _id, owner: req.user._id });
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch(err) {
        res.status(500).send(err);
    }
});

taskRouter.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if(!task)
            return res.status(404).send();
        res.send(task);
    } catch(err) {
        res.status(500).send(err);
    }
});
module.exports = taskRouter;