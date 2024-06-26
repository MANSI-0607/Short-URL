const mongoose = require('mongoose');

const spiderSchema = new mongoose.Schema({
  baseURL: {
    type: String,
    required: true,
  },
  report: {
    type: Object,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
}, { timestamps: true });

const Spider = mongoose.model('spider', spiderSchema);
module.exports = Spider;
