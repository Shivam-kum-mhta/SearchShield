// models/SearchHistory.js
const mongoose = require('../database.cjs');

const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  keywords: {
    type: String,
    required: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = SearchHistory;
