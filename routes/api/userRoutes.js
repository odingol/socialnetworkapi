const router = require('express').Router();
// require all methods from userController.ks and put inside a const object
const {
    getUsers,
    getSingleUser,
    createNewUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createNewUser);

// /api/users/userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId

module.exports = router;


