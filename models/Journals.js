const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    thought: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Journal', journalSchema);
