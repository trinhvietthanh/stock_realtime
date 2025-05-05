const Joi = require("joi");

const addSymbol = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
    price: Joi.number().positive(),
    image: Joi.string(),
    vendorApi: Joi.string(),
  })
}

const getSymbol = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string(),
  })
}

const updatePrice = {
  body: Joi.object().keys({
    newPrice: Joi.number().positive(),
  })
}

module.exports = {
  addSymbol,
  getSymbol,
  updatePrice,
}