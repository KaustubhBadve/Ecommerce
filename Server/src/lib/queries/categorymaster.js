const db = require("../../models");
const constants = require("../../constants/constants");

createCatalog = async function (body) {
  return await db[constants.DB.table.CATEGORY_MASTER].create(body);
};

updateCatalog = async function (obj, query) {
  await db[constants.DB.table.CATEGORY_MASTER].update(obj, {
    where: query,
  });
};

getCategoryList = async function () {
  return await db[constants.DB.table.CATEGORY_MASTER].findAll({
    where: { isActive: 1},
    // attributes: ["id", "itemName", "price", "currency", "description","coverImage"],
  });
};

checkCatalogItemIds = async function(itemIds) {
    return await db[constants.DB.table.CATEGORY_MASTER].findAll({
      where: { id: itemIds },
      attributes: ["id","price"],
    });
};


module.exports = {
  createCatalog,
  updateCatalog,
  getCategoryList,
  checkCatalogItemIds
};
