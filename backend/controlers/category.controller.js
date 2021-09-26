const { Category } = require('../models/category.model');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (e) {
    return res.status(500).json({ success: false, error: e });
  }
};

exports.addCategory = async (req, res) => {
  const { name, icon, color } = req.body;

  const newCategory = new Category({
    name,
    icon,
    color,
  });

  try {
    const category = await newCategory.save();

    if (!category) {
      return res.status(404).json('Category cannot be created!');
    }

    return res.status(201).json(category);
  } catch (e) {
    return res.status(500).json({ success: false, error: e });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (category) {
      return res
        .status(200)
        .json({ success: true, message: 'the category is deleted!' });
    } else {
      return res
        .status(404)
        .json({ success: false, message: 'category not found!' });
    }
  } catch (e) {
    return res.status(500).json({ success: false, error: e });
  }
};
