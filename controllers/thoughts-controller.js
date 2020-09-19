const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({path: 'Thought', select: '-__v'})
        .select('-__v')
        .then((dbThoughtData) => res.json(dbThoughtData)).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one thought
    getThoughtById({ params}, res) {
        Thought.findOne({ _id: params.id})
        .populate({path: 'Thought', select: '-__v'})
        .select('-__v')

            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'There is no thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // add a thought
    createThought({ body}, res) {
        Thought.create(body)
            .then(({ _id, userId}) => {
                // add thought to users thought array
                return User.findOneAndUpdate(
                    { _id: userId},
                    {$push: {thoughts: _id}},
                    {new: true}
                );
            })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({message:'There is no user with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },
    // update a thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {
            new: true,
            runValidators: true
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'There is no thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // Delete a thought
    removeThought({ params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(deletedThought => {
            if(!deletedThought) {
                res.status(404).json({message: 'There is no thought found with this id!'});
                return;
            }
            return User.findOneAndUpdate(
                {_id: deletedThought.userId},
                {$pull: {thoughts: params.id}},
                {new: true}
            )
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'There is no user found with that id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.json(err));
    },
    // add a reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.reactionId},
            {$push: { reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'There is no thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    // delete a reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.reactionId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'There is no thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    }
};

module.exports = thoughtController;