const { validationResult } = require("express-validator");
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.users;

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 400;
    error.data = errors.array();
    return next(error);
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(422).json({
        status: "EMAIL_NOT_FOUND",
        message: "A user with this email does not exist.",
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(422).json({
        status: "INVALID_PASSWORD",
        message: "The password is incorrect.",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      status: "OK",
      token,
      expiresIn: 3600,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const dbUser = await User.findOne({ where: { email } });
    console.log(`DB USER: ${dbUser}`);

    if (dbUser) {
      return res.status(422).json({
        status: "EMAIL_EXISTS",
        message: "Email already exists.",
      });
    }

    const pwHash = await bcrypt.hash(password, 12);
    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: pwHash
    });

    res.status(201).json({
      status: "OK",
      message: "User has been registered successfully.",
    });

  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
