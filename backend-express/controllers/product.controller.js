const db = require("../models");
const Product = db.products;
const Category = db.categories;
const Op = db.Sequelize.Op; 

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, {
    attributes: {exclude: ['category_id']},
    include: [{model: Category}]
  })
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      res.status(500).send({
        message: `Error retrieving Product with id=${id}`
      });
  });
};

exports.findAll = (req, res) => {
  Product
    .findAll({
      where: {
        unitsInStock: {[Op.gt]: 0}
      }
    })
    .then(data => res.send(data))
    .catch(error => {
      res.status(500).send({
        message: error.message || 'Some error occured while retrieving products.'
      });
  });
}

exports.findAllFeatured = (req, res) => {
  Product.findAll({ where:{
    [Op.and]: {
      unitsInStock: { [Op.gt]: 0 },
      featured: 1
    }}
  })
  .then(data => res.send(data))
  .catch(error => {
    res.status(500).send({
      message: error.message || 'Some error occured while retrieving products.'
    });
  });
}

exports.findAllByCategory = (req, res) => {
  const categoryId = req.params.categoryId;

  Product.findAll({ where:{
    [Op.and]: {
      unitsInStock: { [Op.gt]: 0 },
      category_id: categoryId
    }}
  })
  .then(data => res.send(data))
  .catch(error => {
    res.status(500).send({
      message: error.message || `Some error occured while retrieving products for category with id=${categoryId}.`
    });
  });
}
