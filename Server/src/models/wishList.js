const { DataTypes } = require('sequelize');
const constant = require('../constants/constants');

module.exports = (sequelize) => {
  const Product = sequelize.define(constant.DB.table.WISH_LIST_MASTER, {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productIds: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },{ timestamps: false }
  );

  return Product;
};
