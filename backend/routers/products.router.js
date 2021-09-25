const router = require("express").Router();
const {
  getAllProducts,
  addProduct,
} = require("../controlers/product.controller");

router.route("/").get(getAllProducts).post(addProduct);

exports.productRouter = router;
