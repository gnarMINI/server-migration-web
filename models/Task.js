// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    migrationType: String,
    center: String,
    serverCount: Number,
    vendor: String,
    requester: String,
    dueDate: String,
    partWork: Boolean,
    reinstallOS: Boolean,
    memo: String,
    agitLink: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
