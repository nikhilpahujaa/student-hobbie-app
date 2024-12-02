const mongoose = require('mongoose');

const hobbiesSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hobbies: { type: [String] },
});

const Hobbies = mongoose.model('Hobbies', hobbiesSchema);

module.exports = Hobbies;
