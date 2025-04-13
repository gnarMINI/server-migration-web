// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    migrationType: {
        type: String,
        enum: ['external', 'internal'],
        required: true
    },
    center: {
        type: String,
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    serverCount: {
        type: Number,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    },
    partWork: {
        type: Boolean,
        default: false
    },
    reinstallOS: {
        type: Boolean,
        default: false
    },
    memo: {
        type: String
    },
    agitLink: {
        type: String
    },
    status: {
        type: String,
        enum: ['진행전', '작업중', '완료'],
        default: '진행전'
    },
    centerMoved: {
        type: Boolean,
        default: false
    },
    workFile: {
        type: Boolean,
        default: false
    },
    mount: {
        type: Boolean,
        default: false
    },
    cabling: {
        type: Boolean,
        default: false
    },
    serverConfig: {
        type: Boolean,
        default: false
    },
    partReturn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
