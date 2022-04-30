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
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {thoughts: thought._id} },
                { new: true }
            );
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
            ? res.status(404).json({message: 'Could not remove thought inside User!'})
            : res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    }
}