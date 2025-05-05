const { Schema, model } = require('../connection');

const mySchema = new Schema({
     name: { type: String, required: true },
     address: { type: String, required: true },
     city: { type: String, required: true },
     postalcode: { type: Number, required: true },
     country: { type: String, required: true },
     createdAt: { type: Date, default: Date.now }
});

module.exports = model('checkout', mySchema);