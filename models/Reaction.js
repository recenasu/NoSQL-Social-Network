// Import objects from the mongoose package: 'Schema' for defining the structure and properties of the MongoDB subdocument that will be used in the Thought model reaction field.
const { Schema, Types } = require('mongoose');

// Schema only
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username : {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function (value) {
                const formattedTime = value.toLocaleTimeString();
                return formattedTime;
            }
        },
    }
);

// Export the schema
module.exports = reactionSchema;