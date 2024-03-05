const { DataTypes } = require('sequelize');
const constant = require('../constants/constants');

module.exports = (sequelize) => {
  const Product = sequelize.define(constant.DB.table.IMAGE_MASTER, {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Product;
};
