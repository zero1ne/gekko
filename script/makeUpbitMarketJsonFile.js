const _ = require('lodash');
const Upbit = require('upbit-api-node');
const { getTicker, getMinCandles, getCandles, getTick, getOrderbook, getMarketList, subscribe } = Upbit;

const config = require('../config');

const upbit = new Upbit.Exchange(
  config.trader.key,
  config.trader.secret
);

// 1. Listing Assets
getMarketList().then(function(result) {
  const assets = _.pluck(result, 'market');

  const marketList = [];
  _(assets).forEach(function(tradingPair) {
    marketList.push(tradingPair.split('-')[1]);
  }).value();

  const marketUniqueList = marketList.reduce(function(a,b){
    if(a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  _(marketUniqueList).forEach(function(asset) {
    console.log("\""+asset+"\"\,");
  }).value();
  console.log(marketUniqueList.length);
});

// 2. Making markets array for marketPair
getMarketList().then(function(result) {
  const assets = _.pluck(result, 'market');

  const marketList = [];
  _(assets).forEach(function(tradingPair) {
    const market = {};

    const marketPair = [];
    marketPair.push(tradingPair.split('-')[0]);
    marketPair.push(tradingPair.split('-')[1]);
    market.pair = marketPair;

    // TODO: need to get exact information via web crawling
    market.minimalOrder = {};
    market.minimalOrder.amount = 0.1;
    market.minimalOrder.price = 0.00001;
    market.minimalOrder.order = 1;

    marketList.push(market);
  }).value();

  console.log(JSON.stringify(marketList, undefined, 2));
  console.log(marketList.length);
});
