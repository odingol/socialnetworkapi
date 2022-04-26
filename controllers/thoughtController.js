const { User, Thought } = require('../models');

module.exports = {

    // Function to get all thoughts using the find() methodand returning the results as JSON and a catch if there are any errors
    getThoughts(req, res) {
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
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },
    // deleting a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId })
    }


}