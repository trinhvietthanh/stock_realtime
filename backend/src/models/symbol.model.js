const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const symbolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    image: {
      type: String,
    },
    price: {
      type: String,
    },
    vendorApi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

symbolSchema.plugin(toJSON);
symbolSchema.plugin(paginate);

const Symbol = mongoose.model('Symbol', symbolSchema);
module.exports = Symbol;
