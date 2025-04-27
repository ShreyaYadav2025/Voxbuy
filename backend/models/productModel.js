const { Schema, model } = require('../connection');

const mySchema = new Schema({
     name : String,
     image: [
          {type: String}
     ],
     description:{ type: String },
     price:{ type: Number , required: true},
     category:{type:String},
     size:[
          {type:String}
     ],
     color:[
          {type:String}
     ],
     stock:{type :Number },
     createdAt:{ type: Date, default:Date.now}
});

 module.exports = model('product',mySchema );