const mongoose = require('mongoose');

const prepTopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [1, 'Title cannot be empty']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: ['DSA', 'DBMS', 'OS', 'CN', 'System Design', 'Projects', 'HR'],
            message: '{VALUE} is not a valid category'
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['Not Started', 'In Progress', 'Revised'],
            message: '{VALUE} is not a valid status'
        },
        default: 'Not Started'
    },
    confidenceLevel: {
        type: Number,
        required: [true, 'Confidence level is required'],
        min: [1, 'Confidence level must be at least 1'],
        max: [5, 'Confidence level cannot exceed 5']
    },
    lastRevisedDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('PrepTopic', prepTopicSchema);
