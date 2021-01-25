const { body } = require("express-validator");

exports.order = [
  body("contactName")
    .isString()
    .withMessage("Contact name is not valid.")
    .trim(),
  body("city").isString().withMessage("City is not valid.").trim(),
  body("address").isString().withMessage("Address is not valid.").trim(),
  body("phone").isString().withMessage("Address is not valid.").trim(),
  body("total").isDecimal().withMessage("Total is not valid.").trim(),
  body("order_items")
    .isArray({ min: 1 })
    .withMessage("Please add products to cart that you want to order."),
];
