const { User, Thought } = require('../models');

module.exports = {
    // Get all users using the find() method and returning the results as JSON with a catch if any errors exist
    getUsers(req, res) {
        User.find()
        .populate('thoughts')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with that ID!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Creating a new user
    createNewUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
            ? res.status(404).json({message: 'No user with that id! '})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with that ID!' })
            : Thought.deleteMany({_id: { $in: user.applications } })
        )
        .then(() => res.json({ message: 'User and their posted thoughts are deleted!'}))
        .catch((err) => res.status(500).json(err));
    },

    // Adding a friend to the friendslist. This add the body of the friendId only to the User
    addFriend(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user exists with the following id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    // Removing a friend from the friends list. This finds the User based on its ID and then updates the friends array associated with its friendId to be removed from the User list.
    removeFriend(req, res) {
        console.log(res);
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
            ? res.status(404).json({message: 'No User found with the following id!' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};