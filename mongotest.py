import pymongo
# Replace the uri string with your MongoDB deployment's connection string.
conn_str = "mongodb://localhost:27217"
# set a 5-second connection timeout
client = pymongo.MongoClient(conn_str, serverSelectionTimeoutMS=5000)


print("Connected to the server.")

for db in client.list_databases():
    print(db)


for col in client["machineData"].list_collections():
    print(col)
# print(client.server_info())

mydb = client["mydatabase"]
mycol = mydb["customers"]

mydict = { "name": "John", "address": "Highway 37" }

x = mycol.insert_one(mydict)



