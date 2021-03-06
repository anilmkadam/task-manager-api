const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();
const auth = require('../middleware/auth.middleware');
const { request } = require('express');

userRouter.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({user, token});
    } catch(err) {
        res.status(400).send(err);
    }  
});

userRouter.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.patch("/users/me", auth, async (req, res) => {
    
    const updates = Object.keys(req.body);
    const allowedUpdatesField = ["name", "email", "password", "age"];
    const isAllowedUpdatesOp = updates.every(update => allowedUpdatesField.includes(update));

    if(!isAllowedUpdatesOp) {
        return res.status(400).send({error: 'Invalid update operation!'});
    }
    try {
        const user = req.user;

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }  
});

userRouter.get('/users/me', auth , async (req, res) => {
        res.send(req.user);
});

userRouter.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch(err) {
        res.status(500).send(err);
    }
});

userRouter.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => {
            return t.token !== req.token;
        });

        await req.user.save();
        res.send();
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
});

userRouter.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save();
        res.send();
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = userRouter;
