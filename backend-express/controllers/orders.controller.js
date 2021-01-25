const db = require("../models");
const Order = db.orders;
const OrderItem = db.orderItems;
const Product = db.products;
const sequelize = db.sequelize;

const { validationResult } = require("express-validator");
const Op = db.Sequelize.Op;

exports.findAllByUser = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        user_id: req.user.id,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
        attributes: { exclude: ["product_id", "order_id"] },
      },
      attributes: { exclude: ["user_id"] },
    });
    
    res.status(200).json({
      status: "OK",
      orders,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        user_id: req.user.id,
        id: req.params.id,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "NOT_FOUND",
        message: `Order with id=${req.params.id} not found.`,
      });
    }

    res.status(200).json({
      status: "OK",
      order,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.store = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { contactName, city, address, phone, order_items } = req.body;
  let totalDb = 0;

  for (const item of order_items) {
    if (isNaN(item.quantity) || item.quantity < 1) {
      return res.status(422).json({
        status: "ERROR",
        message: "Quantity must be an integer greater than 0.",
      });
    }

    const product = await Product.findOne({ where: { id: item.product.id } });
    if (!product) {
      return res.status(422).json({
        status: "ERROR",
        message: `Product with id=${item.product.id} does not exist.`,
      });
    }

    item.product.model = product;
    item.amount = product.unitPrice * item.quantity;
    totalDb += item.amount;
  }

  const transaction = await sequelize.transaction();

  try {
    const createdAt = new Date();
    const order = await Order.create(
      {
        contactName,
        city,
        address,
        phone,
        total: totalDb,
        createdAt,
        user_id: req.user.id,
      },
      { transaction }
    );

    let id = 1;
    for (const item of order_items) {
      await OrderItem.create(
        {
          orderId: order.id,
          id,
          quantity: item.quantity,
          amount: item.amount,
          product_id: item.product.id,
        },
        { transaction }
      );

      item.product.model.quantity -= item.quantity;
      await item.product.model.save({ transaction });
      id++;
    }

    await transaction.commit();

    res.status(201).json({
      status: "OK",
      message: "Order has been created successfully.",
    });
  } catch (error) {
    await transaction.rollback();
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
