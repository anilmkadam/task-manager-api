const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const Task = require('./models/task');
require('./db/mongoose');


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.post("/users", (req, res) => {

    const user = new User(req.body);

    user.save().then(result => {
        console.log("Inserted", result);
        res.status(201).send(user);
    }).catch(err => {
        console.log("error !!", err);
        res.status(400).send(err);
    });    
});

app.get('/users', (req, res) => {
    User.find({}).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(400).send(err);
    });

});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(result => {
        res.status(201).send(result);
    }).catch(err => {
        res.status(400).send(err);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(400).send(err);
    });

});


app.listen(port, () => {
    console.log("Listening at port ", port);
});