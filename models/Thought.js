// Import objects from the mongoose package: 'Schema' for defining the structure and properties of MongoDB documents, and 'model' for creating mongoose models.
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function (value) {
                const formattedTime = value.toLocaleTimeString();
                return formattedTime;
            }
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function () {
    const reactions = this.reactions.length;
    return reactions;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;