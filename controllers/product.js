const Product = require("../models/products");

exports.getAll = async (req, res, next) => {
  try {
    const result = await Product.find();
    res.status(200).json({ result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
