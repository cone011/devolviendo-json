const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Products", productsSchema);
