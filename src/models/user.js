const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password"))
                throw new Error("Insecure password, please change!!");
        }
    }
});

userSchema.statics.findByCredentials = async (email, password) => {

        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('Unable to login')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
       
        if (!isMatch) {
            throw new Error('Unable to login')
        }
    
        return user;
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;