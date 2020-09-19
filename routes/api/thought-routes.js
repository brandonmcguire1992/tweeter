const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');

// GET all thoughts and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Get one thought, update thought, and delete thought at /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(removeThought);

// POST reaction to thought
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE reaction from thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;