import csv
import redis
import json
r = redis.Redis()


fields = {"id": "0x441c9045713c76c9702f24f249da8d4af78bedc582b10bb4106ba1b91beff057", "block": 5264251, "minerAddress": "0x2bAce9b8e9b8880f1c1217e867D52eC1edF54c0E", "newTokenBalance": 0, "previousTokenBalance": 513746485}.keys()
writer = csv.DictWriter(open("missed_payouts.csv",'w'), fieldnames = fields)
writer.writeheader()

def get_ids_from_public_key(public_key):
  ret = [] 
  key = b"balance_transfers:"+public_key
  if r.type(key) != b"list": 
    return ret
  return set([json.loads(row.decode("utf-8"))["balancePaymentId"] for row in r.lrange(key,0,-1)])



for balance_transfer_key in r.keys("balance_payments:*"):
  _, public_key = balance_transfer_key.split(b":")
  transaction_ids = get_ids_from_public_key(public_key)
  for balance_transfer in r.lrange(balance_transfer_key,0,-1):
    balance_transfer = json.loads(balance_transfer.decode("utf-8"))
    if balance_transfer['id'] not in transaction_ids:
      writer.writerow(balance_transfer)
      print(json.dumps(balance_transfer))
