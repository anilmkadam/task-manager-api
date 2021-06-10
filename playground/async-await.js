require('../src/db/mongoose');
const User = require('../src/models/user');

const updateAgeAndCount = async (id, age) => {

    const user = await User.findByIdAndUpdate({_id: id}, {age});
    const count = await User.countDocuments({age});

    return count;
};

updateAgeAndCount("60c1cbeffc8f1f0f9d6b3f10", 24)
    .then(count => console.log(count))
    .catch(err => console.log(err));