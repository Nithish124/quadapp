const mongoose=require('mongoose');
const tickerSchema = new mongoose.Schema({
    name: String,
    last: String,
    buy: String,
    sell: String,
    volume: String,
    base_unit: String,
    fetched_at: { type: Date, default: Date.now }
});
const Ticker = mongoose.model('Ticker', tickerSchema);
module.exports=Ticker;