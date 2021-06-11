const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch(err) {
        res.status(400).send(err);
    }  
});

userRouter.patch("/users/:id", async (req, res) => {
    const _id = req.params.id;
    
    const updates = Object.keys(req.body);
    const allowedUpdatesField = ["name", "email", "password", "age"];
    const isAllowedUpdatesOp = updates.every(update => allowedUpdatesField.includes(update));

    if(!isAllowedUpdatesOp) {
        return res.status(400).send({error: 'Invalid update operation!'});
    }
    try {
        const user = await User.findById(_id);

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        if(!user)
            return res.status(404).send();
        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }  
});

userRouter.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if(!user)
            return res.status(404).send();
        res.send(user);
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user)
            return res.status(404).send();
        res.send(user);
    } catch(err) {
        res.status(500).send(err);
    }
});

module.exports = userRouter;
