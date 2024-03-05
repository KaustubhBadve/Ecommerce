const constant = require("../constants/constants");

module.exports = (sequelize, DataType) => {
  const CATALOGS = sequelize.define(
    constant.DB.table.CATEGORY_MASTER,
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataType.BIGINT,
      },
      categoryName: {
        type: DataType.STRING,
        allowNull: false,
      },
      refImg: {
        type: DataType.STRING,
        allowNull: true
      },
      isActive: {
        type: DataType.INTEGER,
        allowNull: false,
        default:1
      },
    },
    { timestamps: false }
  );

  return CATALOGS;
};
