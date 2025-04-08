const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const historySchema = mongoose.Schema(
  {
    symbol: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Symbol',
      required: true,
    },
    open: {
      type: String,
    },
    close: {
      type: Float32Array,
    },
    high: {
      type: String,
    },
    low: {
      type: String,
    },
    period: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

historySchema.plugin(toJSON);
historySchema.plugin(paginate);

const Symbol = mongoose.model('History', historySchema);
module.exports = Symbol;
