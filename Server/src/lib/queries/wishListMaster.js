const db = require("../../models");
const constants = require("../../constants/constants");

createWishList = async function (body) {
  return await db[constants.DB.table.WISH_LIST_MASTER].create(body);
};

updateWishList = async function (obj, query) {
  await db[constants.DB.table.WISH_LIST_MASTER].update(obj, {
    where: query,
  });
};

findWishListingItem = async function (userId) {
  const user = await db[constants.DB.table.WISH_LIST_MASTER].findOne({
    where: { userId },
  });
  return user ? user.dataValues : null;
};

checkCatalogItemIds = async function(itemIds) {
    return await db[constants.DB.table.WISH_LIST_MASTER].findAll({
      where: { id: itemIds },
      attributes: ["id","price"],
    });
};


module.exports = {
  createWishList,
  updateWishList,
  findWishListingItem
};
