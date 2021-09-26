const { Product } = require('../models/product.model');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ success: false, error: e });
  }
};

exports.addProduct = async (req, res) => {
  const { name, image, countInStock } = req.body;

  const newProduct = new Product({
    name,
    image,
    countInStock,
  });

  try {
    const product = await newProduct.save();
    res.json(product);
  } catch (e) {
    return res.status(500).json({ success: false, error: e });
  }
};
