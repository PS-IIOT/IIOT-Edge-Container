from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import json
from deamon.database import Database
from bson import json_util

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin"
mongo = PyMongo(app)
db = mongo.db
    
@app.route('/api/v1/machines', methods=['GET'])
def getAllMachine():
    collist = db.list_collection_names()
    collist.remove("Ip_whitelist")
    collist.remove("Errorlog")
    datalist = []
    for col in collist:
        cursor = db[col].find()
        json_data = json_util.dumps(cursor.next())
        datalist.append(json.loads(json_data))
    return datalist

@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getOneMachine(serialnumber):
    cursor = db[serialnumber].find({'serialnumber': serialnumber})
    item = json_util.dumps(cursor.next())
    return json.loads(item)

@app.route('/api/v1/errors', methods=['GET'])
def getAllError():
    cursor = db["Errorlog"].find({})
    item = json_util.dumps(cursor)
    return json.loads(item)

@app.route('/api/v1/erros/<string:serialnumber>', methods=['GET'])
def getOneError(serialnumber):
    cursor = db["Errorlog"].find({"machine": serialnumber})
    item = json_util.dumps(cursor.toArray())
    return json.loads(item)

def create_app():
    with app.app_context():
        app.run()