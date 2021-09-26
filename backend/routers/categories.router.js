const router = require('express').Router();
const {
  getAllCategories,
  addCategory,
  removeCategory,
} = require('../controlers/category.controller');

router.route('/').get(getAllCategories).post(addCategory);

router.route('/:id').delete(removeCategory);

exports.categoryRouter = router;
