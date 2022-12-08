from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import json
from deamon.database import Database
from bson import json_util
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin"
mongo = PyMongo(app)
db = mongo.db


@app.route('/api/v1/machines', methods=['GET'])
def getAllMachine():
    dataList = []
    cursor = db["Machinedata"].find({})
    crusor_errorlog = db["Errorlog"].find({})
    error = json_util.dumps(crusor_errorlog)
    item = json_util.dumps(cursor)
    dataList.append(item)
    dataList.append(error)
    print(f"{dataList}")
    return json.loads(item)


@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getOneMachine(serialnumber):
    dataList = []
    cursor = db["Machinedata"].find({"serialnumber": serialnumber})
    crusor_errorlog = db["Errorlog"].find({"machine":serialnumber})
    item = json_util.dumps(cursor.next())
    error =json_util.dumps(crusor_errorlog)
    dataList.append(item)
    dataList.append(error)
    print(f"{dataList}")
    return json.loads(item)

@app.route('/api/v1/machines/<string:serialnumber>', methods=['POST'])
def addIp(serialnumber):
    dataList = []
    cursor = db["Machinedata"].find({"serialnumber": serialnumber})
    crusor_errorlog = db["Errorlog"].find({"machine":serialnumber})
    item = json_util.dumps(cursor.next())
    error =json_util.dumps(crusor_errorlog)
    dataList.append(item)
    dataList.append(error)
    print(f"{dataList}")
    return json.loads(item)



def create_app():
    with app.app_context():
        app.run()
