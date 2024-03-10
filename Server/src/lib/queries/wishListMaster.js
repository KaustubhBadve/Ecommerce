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

createCartList = async function (body) {
  return await db[constants.DB.table.CART_MASTER].create(body);
};

updateCartList = async function (obj, query) {
  await db[constants.DB.table.CART_MASTER].update(obj, {
    where: query,
  });
};

findCartItem = async function (userId) {
  const user = await db[constants.DB.table.CART_MASTER].findOne({
    where: { userId },
  });
  return user ? user.dataValues : null;
};



module.exports = {
  createWishList,
  updateWishList,
  findWishListingItem,
  createCartList,
  updateCartList,
  findCartItem
};
