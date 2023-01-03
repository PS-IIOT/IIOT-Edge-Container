from flask import request, Response, make_response
from apiflask import APIFlask
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import json
from bson import json_util
from flask_cors import CORS
import logging
from functools import wraps
import re

logging.basicConfig(level=logging.DEBUG,
                    format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')

IPregex = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$"

app = APIFlask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin"
mongo = PyMongo(app)
db = mongo.db

users = {
    "admin": "admin"
}

def authentication(f):
    @wraps(f)
    def decorated():
        auth = request.authorization
        if auth and auth.username in users and auth.password == users[auth.username]:
            return f()
        return make_response('Could not verify your login!', 401, {'WWW-Authenticate': 'Basic realm="Login Required"'})
    return decorated


@app.get('/api/v1/machines')
def getAllMachine():
    machineList = []
    cursor = list(db["Machinedata"].find({}))
    cursor_errorlog = list(db["Errorlog"].find({}))
    for machine in cursor:
        print(f"{machine}")
        machine["errorlog"] = []
        for error in cursor_errorlog:
            print(f"{error}")
            if machine["serialnumber"] == error["machine"]:
                machine["errorlog"].append(error)
        machineList.append(machine)
    return Response(json_util.dumps(machineList), mimetype='application/json', status=200)


@app.get('/api/v1/machines/<string:serialnumber>')
def getOneMachine(serialnumber):
    cursor = list(db["Machinedata"].find({"serialnumber": serialnumber}))
    cursor_errorlog = list(db["Errorlog"].find({"machine": serialnumber}))
    try:
        cursor[0]["errorlog"] = cursor_errorlog[0]
    except Exception as e:
        cursor[0]["errorlog"] = []
    return Response(json_util.dumps(cursor[0]), mimetype='application/json', status=200)


@app.get('/api/v1/machines/errors')
def getAllErrors():
    crusor_errorlog = list(db["Errorlog"].find({}))
    return Response(json_util.dumps(crusor_errorlog), mimetype='application/json', status=200)


@app.get('/api/v1/machines/allowlist')
@authentication
def getAllowlist():
    allowList = db["Ip_whitelist"].find_one({})
    if (allowList == None):
        return Response(json_util.dumps({}), mimetype='application/json', status=404)
    allowlistJson = json_util.dumps(allowList)
    return Response(allowlistJson, mimetype='application/json', status=200)


@app.post('/api/v1/machines/allowlist')
@authentication
def insertIp():
    ip = request.json['ip']
    if(re.search(IPregex, ip)):
        newAllowlist = db["Ip_whitelist"].find_one_and_update(
            {}, {"$push": {"Ip_Adresses": ip}}, upsert=True, return_document=True)
        return Response(json_util.dumps(newAllowlist), mimetype='application/json', status=200)
    return Response(json_util.dumps({}), mimetype='application/json', status=422)                       #code 422 unprocessable entity


@app.delete('/api/v1/machines/allowlist')
@authentication
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
    try:
        with app.app_context():
            app.run()
    except Exception as e:
        logging.debug(f"{e}")
