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
    machineList = []
    cursor = list(db["Machinedata"].find({}))
    cursor_errorlog = list(db["Errorlog"].find({}))
    for machine in cursor:
        print(f"{machine}")
        for error in cursor_errorlog:
            print(f"{error}")
            if machine["serialnumber"] == error["machine"]:    
                machine["errorlog"] = error
                machineList.append(machine)
    item = json_util.dumps(machineList)
    return json.loads(item)
    
@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getOneMachine(serialnumber):
    cursor = list(db["Machinedata"].find({"serialnumber": serialnumber}))
    crusor_errorlog = list(db["Errorlog"].find({"machine":serialnumber}))
    cursor[0]["errorlog"] = crusor_errorlog[0]
    print(cursor)
    item = json_util.dumps(cursor[0])
    return json.loads(item)

@app.route('/api/v1/machines/errors', methods=['GET'])
def getAllErrors():
    crusor_errorlog = list(db["Errorlog"].find({}))
    error =json_util.dumps(crusor_errorlog)
    return json.loads(error)



def create_app():
    with app.app_context():
        app.run()
