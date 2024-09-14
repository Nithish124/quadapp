const Ticker= require('../model');
const axios = require('axios');
module.exports.fetchAndStoreTickers = async () => {
    try {
      const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
      const tickers = response.data;
      const tickersArray = Object.values(tickers);
      const top10Tickers = tickersArray
        .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
        .slice(0, 10);
      await Ticker.deleteMany({});
      await Ticker.insertMany(top10Tickers.map(ticker => ({
        name: ticker.name,
        last: ticker.last,
        buy: ticker.buy,
        sell: ticker.sell,
        volume: ticker.volume,
        base_unit: ticker.base_unit
      })));
      console.log('Top 10 tickers fetched and stored in MongoDB.');
    } catch (error) {
      console.error('Error fetching or storing tickers:', error.message);
    }
  };
module.exports.apiget=async(req,res)=>{
  try {
    const tickers = await Ticker.find().sort({ fetched_at: -1 });
    res.json(tickers);
  } catch (error) {
    console.error('Error fetching tickers from MongoDB:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}