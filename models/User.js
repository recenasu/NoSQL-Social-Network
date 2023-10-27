// Import objects from the mongoose package: 'Schema' for defining the structure and properties of MongoDB documents, and 'model' for creating mongoose models.
const { Schema, model } = require('mongoose');

// Schema to create the User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property that gets the length of the friends array.
userSchema
.virtual('friendCount')
.get(function() {
    return this.friends.length;
});

// Initialize and export the model.
const User = model('user', userSchema);

module.exports = User;
