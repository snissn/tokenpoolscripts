var redis = require("redis");
var redisClient = redis.createClient();

var Web3 = require('web3')
var web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io')) //requires a full node


function get_ids_from_public_key(public_key){
  var ret = [] // return ids
  var key = "balance_transfers:"+public_key
  redisClient.type(key,  function (err, type) { // get the type of the key
          if(type=="list"){ // get all of the keys that have balance transfer (blockchain transactions)


}
balance_transfers:0xF13e2680a930aE3a640188afe0F94aFCeBe7023b
balance_payments:0xF13e2680a930aE3a640188afe0F94aFCeBe7023b
balance_payments:0xF13e2680a930aE3a640188afe0F94aFCeBe7023b


redisClient.keys('*',function(err, keys){
  keys.forEach(function(key,i){
    if(!key.toLowerCase().endsWith('0xf13e2680a930aE3a640188afe0F94aFCeBe7023b'.toLowerCase())) return;
    console.log(key);
    if(key.startsWith("balance_payments")){ // get all of the keys that have balance transfer (blockchain transactions)
      console.log(key);
      redisClient.type(key,  function (err, type) { // get the type of the key
          if(type=="list"){ // get all of the keys that have balance transfer (blockchain transactions)
            redisClient.lrange(key, 0, -1, function (err, transfers) {
              console.log("fetching key", key);
              transfers.forEach(function (transfer, i) {
                console.log(transfer);
                transfer = JSON.parse(transfer);
                console.log("id", transfer['id']);
                return;
                var transaction = web3.eth.getTransaction(transfer['txHash']); // check if the transaction is actually on the blockchain
                if(!transaction){ // transaction is not on the blockchain
                  console.log(JSON.stringify(transfer));
                }
              });
            });
          }
      });
    }
  });
});
