import csv
import sys
import json
fields = {'balancePaymentId': '0x9a57377db3675933a8bb12cd25651e9db80c3a11ebbd1349248a70316d22e377', 'tokenAmount': 1218624102, 'txHash': '0x4b1126ca6215eedbf60094e8a5baac5eea353e1a6c9c15bb94a25c770fa3fa0f', 'addressTo': '0x8C24092BB23394f83CDd7520FF42C437e25a3c39', 'confirmed': True, 'block': 5264959}.keys()

writer= csv.DictWriter(open("missed_transactions.csv",'w'), fieldnames=fields)
writer.writeheader()


for line in sys.stdin:
  try:
    line = json.loads(line)
    print(line)
    writer.writerow(line)
  except Exception as e:
    print(e)
    print(line)
