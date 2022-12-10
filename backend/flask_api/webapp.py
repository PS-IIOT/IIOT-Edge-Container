from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import json
from deamon.database import Database
from bson import json_util
from flask_cors import CORS
from flask import request
from flask import Response


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
                machine["errorlog"] = []
                machine["errorlog"].append(error)
                machineList.append(machine)
    item = json_util.dumps(machineList)
    return json.loads(item)


@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getOneMachine(serialnumber):
    cursor = list(db["Machinedata"].find({"serialnumber": serialnumber}))
    cursor_errorlog = list(db["Errorlog"].find({"machine": serialnumber}))
    cursor[0]["errorlog"] = cursor_errorlog[0]
    print(cursor)
    item = json_util.dumps(cursor[0])
    return json.loads(item)


@app.route('/api/v1/machines/errors', methods=['GET'])
def getAllErrors():
    crusor_errorlog = list(db["Errorlog"].find({}))
    error = json_util.dumps(crusor_errorlog)
    return json.loads(error)


@app.route('/api/v1/machines/allowlist', methods=['GET'])
def getAllowlist():
    allowList = db["Ip_whitelist"].find_one({})
    if (allowList == None):
        return Response(json_util.dumps({}), mimetype='application/json', status=404)
    allowlistJson = json_util.dumps(allowList)
    return Response(allowlistJson, mimetype='application/json', status=200)


@ app.route('/api/v1/machines/allowlist', methods=['POST'])
def insertIp():
    ip = request.json['ip']
    newAllowlist = db["Ip_whitelist"].find_one_and_update(
        {}, {"$push": {"Ip_Adresses": ip}}, upsert=True, return_document=True)
    return Response(json_util.dumps(newAllowlist), mimetype='application/json', status=200)


@ app.route('/api/v1/machines/allowlist', methods=['DELETE'])
def deleteIp():
    ip = request.json['ip']
    allowList = db["Ip_whitelist"].find_one({})
    newList = allowList["Ip_Adresses"]
    if (ip not in newList):
        return Response(json_util.dumps(
            allowList
        ), mimetype='application/json', status=404)

    newList.remove(ip)
    updatedList = db["Ip_whitelist"].find_one_and_update(
        {}, {"$set": {"Ip_Adresses": newList}}, return_document=True
    )
    return Response(json_util.dumps(updatedList), mimetype='application/json', status=200)


def create_app():
    with app.app_context():
        app.run()
