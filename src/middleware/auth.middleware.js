const jwt = require('jsonwebtoken');
const { rawListeners } = require('../models/user');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decodedToken = jwt.verify(token, "thisismycourse");
        
        const user = await User.findOne({_id: decodedToken._id, 'tokens.token': token});
        if(!user)
            throw new Error();
        req.token = token;
        req.user = user;
        next();
    } catch(err) {
        console.log(err)
        res.send("Please Authenticate!")
    }
}

module.exports = auth;