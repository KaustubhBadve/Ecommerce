const db = require("../../models");
const constants = require("../../constants/constants");

createProduct = async function (body) {
  return await db[constants.DB.table.PRODUCT_MASTER].create(body);
};

createImage = async function (body) {
  return await db[constants.DB.table.IMAGE_MASTER].create(body);
};

updateCatalog = async function (obj, query) {
  await db[constants.DB.table.PRODUCT_MASTER].update(obj, {
    where: query,
  });
};

getCategoryList = async function () {
  return await db[constants.DB.table.PRODUCT_MASTER].findAll({
    where: { isActive: 1},
    // attributes: ["id", "itemName", "price", "currency", "description","coverImage"],
  });
};

checkCatalogItemIds = async function(itemIds) {
    return await db[constants.DB.table.PRODUCT_MASTER].findAll({
      where: { id: itemIds },
      attributes: ["id","price"],
    });
};


module.exports = {
  createProduct,
  createImage
};
