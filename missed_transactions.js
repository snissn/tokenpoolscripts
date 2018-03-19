var redis = require("redis");
var redisClient = redis.createClient();

var Web3 = require('web3')
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io')) //requires a full node

redisClient.keys('*',function(err, keys){
  keys.forEach(function(key,i){
    redisClient.type(key,  function (err, type) { // get the type of the key
        if(type=="list" && key.startsWith("balance_transfers")){ // get all of the keys that have balance transfer (blockchain transactions)
          redisClient.lrange(key, 0, -1, function (err, transfers) {
            transfers.forEach(function (transfer, i) {
              transfer = JSON.parse(transfer);
              var transaction = web3.eth.getTransaction(transfer['txHash']); // check if the transaction is actually on the blockchain
              if(!transaction){ // transaction is not on the blockchain
                console.log(JSON.stringify(transfer));
              }
            });
          });
        }
    });
  });
});
