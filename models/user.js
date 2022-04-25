const { Schema, model } = require('mongoose');

let validateEmail = function(email) {
    var read = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return read.test(email);
};


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: 'Email address is required!',
            unique: true,
            // Must match a valid email address (look into Mongoose matching validation)
            validate: [validateEmail, 'Please fill a valid email address!'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Creating a virual property called `friendCount` that retrieves the length of the friends array field on query

userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return `${this.friends}`
    })
    .set(function (v) {
        const friends = v.length();
        this.set({ friends });
    });

const User = model('User', userSchema);

module.exports = User;