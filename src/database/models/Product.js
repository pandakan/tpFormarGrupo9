module.exports = (sequelize, dataTypes) => {
  let alias = "Product";
  let cols = {
    id: {}
  }

  let config = {
    tableName: ""
  }

  const Product = sequelize.define(alias, cols, config);

  return Product;
}
