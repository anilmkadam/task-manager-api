require('../src/db/mongoose');
const Task = require('../src/models/task');
const User = require('../src/models/user');

// User.findByIdAndUpdate("60c1a31ea87d010a55fce64d", {age: 24 }).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 0});
// }).then(count => console.log(count)).catch(e => console.log(e));

Task.findByIdAndDelete("60c1ee6d61fc091185365ebd").then((task) => {
    console.log(task);
    return Task.countDocuments({completed: false});
}).then(count => console.log(count)).catch(e => console.log(e));

