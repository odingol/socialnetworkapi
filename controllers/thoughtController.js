const { User, Thought } = require('../models');

module.exports = {

    // Function to get all thoughts using the find() method and returning the results as JSON and a catch if there are any errors
    getThoughts (req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // get a single thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId })
            .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No existing thought with that id!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // creating a thought
    createNewThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            // Updates the thoughts key array so the user's thoughts are visible upon user route request
            // console.log('creating a new thought', thought);
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {thoughts: thought._id} },
                { new: true }
            );
        })
        .then((user) => {
        !user
            ? res.status(404).json({message: 'Thought is created, but no User with that id exists!'})
            : res.json(user);
        console.log(user);
    })
        .catch((err) => res.status(500).json(err));
        console.log(req.body);
    },

    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({message: 'No existing thought with that id!'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    
    // deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId })
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'No existing thought with that id!'})
            : User.findOneAndUpdate(
                {thought: req.params.thoughtId},
                { $pull: {thoughts: req.parmas.thoughtId}},
                {new: true}
            )
        })
        .then((user) => {
            !user
            ? res.status(404).json({message: 'Thought has been removed, but no user exists with that id!'})
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

    // Creating a reaction
    createReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No existing thought with that id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
        !thought
        ? res.status(404).json({message: 'No existing thought with that id!' })
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
};