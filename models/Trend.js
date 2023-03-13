const mongoose = require('mongoose')

const TrendSchema = new mongoose.Schema({
    no: { type: String, required: true },
    name: { type: String, required: true },
    tweet_volume: { type: Number },
    time: { type: String, required: true },
    create_at: {type:Date ,default: Date.now}
  });

module.exports = mongoose.model('Trend', TrendSchema);