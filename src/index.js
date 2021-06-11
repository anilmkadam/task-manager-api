const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.router');
const taskRouter = require('./routes/tasks.router');
require('./db/mongoose');


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.use(userRoutes);
app.use(taskRouter);

app.listen(port, () => {
    console.log("Listening at port ", port);
});