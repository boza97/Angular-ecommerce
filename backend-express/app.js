if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/orders.routes')(app);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errorResponse = {
    status: 'ERROR',
    message: error.message
  };

  if(error.data) {
    errorResponse.errors = error.data;
  }

  res.status(statusCode).json(errorResponse);
});

app.use((req, res, next) => {
  res.status(404).send();
});

db.sequelize
  .authenticate()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(error => console.log(error));
