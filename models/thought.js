const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create the thoughts model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

// Creating a virual property called `reactionCount` that retrieves the length of the reactions array field on query

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return `${this.reactions}`
    })
    .set(function (v) {
         const reactions = v.length();
         this.set({ reactions });
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;