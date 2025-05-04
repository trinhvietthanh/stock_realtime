const Joi = require("joi");

const addSymbol = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    symbol: Joi.string().required(),
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

module.exports = {
  addSymbol,
  getSymbol,
}