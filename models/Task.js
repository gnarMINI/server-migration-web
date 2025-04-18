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
    requestDate: {
        type: String
    },
    dueDate: {
        type: String
    },
    partWork: {
        type: String,
        enum: ['unchecked', 'checked', '✖'],
        default: '✖'
    },
    reinstallOS: {
        type: String,
        enum: ['unchecked', 'checked', '✖'],
        default: '✖'
    },
    vendorMigration: {
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
        enum: ['요청', '진행', '완료'],
        default: '요청'
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
        type: String,
        enum: ['unchecked', 'checked', '✖'],
        default: '✖'
    },
    unmount: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
