const mongoose = require('mongoose');
const validator = require('validator');

const connectionUrl = "mongodb://127.0.0.1:27017/task-manager-api";
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        validate(value) {
            if(!validator.isEmail(value))
                throw new Error('Invalid email..');
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error('Error not be negative..');
        }
    }
});

const me = new User({
    name: 'PQR',
    email: 'pqr@gmail.com',
   
});

me.save().then((res) => console.log(res)).catch(err => console.log(err));

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

// const task = new Task({
//     description: "Clean the house",
//     completed: true
// });

// task.save().then(res => console.log(res)).catch(err => console.log('error! ', err));