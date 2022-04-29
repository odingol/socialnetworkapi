const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createNewThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createNewThought);

// api/thoughts/thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions