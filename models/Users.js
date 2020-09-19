const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trime: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /[\w|.|-]*@\w*\.[\w|.]*/g,
                'Please use a valid email!'
            ]
        },
        // associate thought model
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function() {
    // return friends array
    // return this.friends.length;
});

const User = model('Users', userSchema);

module.exports = User;