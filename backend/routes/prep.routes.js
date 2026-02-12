const express = require('express');
const router = express.Router();
const {
    getAllTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic
} = require('../controllers/prep.controller');

router.route('/')
    .get(getAllTopics)
    .post(createTopic);

router.route('/:id')
    .get(getTopicById)
    .put(updateTopic)
    .delete(deleteTopic);

module.exports = router;
