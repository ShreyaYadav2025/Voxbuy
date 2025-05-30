const { Schema, model } = require('../connection');

const mySchema = new Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     description: { type: String, required: true },
     createdAt: { type: Date, default: Date.now }
});

module.exports = model('feedback', mySchema);