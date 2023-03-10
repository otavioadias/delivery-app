const productsService = require('../services/Products.service');

const getProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();
  return res.status(200).json(allProducts);
};

module.exports = { getProducts };