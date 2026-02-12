const PrepTopic = require('../models/prep.model');

// @desc    Get all preparation topics
// @route   GET /api/prep-topics
// @access  Public
const getAllTopics = async (req, res, next) => {
    try {
        const { category, status } = req.query;

        // Build filter object
        const filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;

        const topics = await PrepTopic.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: topics.length,
            data: topics
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new preparation topic
// @route   POST /api/prep-topics
// @access  Public
const createTopic = async (req, res, next) => {
    try {
        const topic = await PrepTopic.create(req.body);

        res.status(201).json({
            success: true,
            data: topic
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update preparation topic
// @route   PUT /api/prep-topics/:id
// @access  Public
const updateTopic = async (req, res, next) => {
    try {
        const topic = await PrepTopic.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.status(200).json({
            success: true,
            data: topic
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single preparation topic
// @route   GET /api/prep-topics/:id
// @access  Public
const getTopicById = async (req, res, next) => {
    try {
        const topic = await PrepTopic.findById(req.params.id);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.status(200).json({
            success: true,
            data: topic
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid topic ID'
            });
        }
        next(error);
    }
};

// @desc    Delete preparation topic
// @route   DELETE /api/prep-topics/:id
// @access  Public
const deleteTopic = async (req, res, next) => {
    try {
        const topic = await PrepTopic.findByIdAndDelete(req.params.id);

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: 'Topic not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Topic deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTopics,
    getTopicById,
    createTopic,
    updateTopic,
    deleteTopic
};
