const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createNewThought);

// api/thoughts/thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions