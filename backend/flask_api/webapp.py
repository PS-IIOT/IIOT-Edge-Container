from flask import Flask, request, Response, make_response, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
from bson import json_util
from flask_cors import CORS
from flask import request
from flask import Response
from dotenv import load_dotenv
from pathlib import Path
import os
import pymongo
import logging
from functools import wraps
import re

logging.basicConfig(level=logging.DEBUG,
                    format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')

IPregex = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$"

app = Flask(__name__)
CORS(app)

dotenv_path = Path('backend/.env')
load_dotenv(dotenv_path)
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
# app.config["MONGO_URI"] = 'mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin'
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


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


swaggerui_blueprint = get_swaggerui_blueprint('/docs', '/static/swagger.json')

app.register_blueprint(swaggerui_blueprint, url_prefix='/docs')


@app.route('/api/v1/machines', methods=['GET'])
def getAllMachine():
    """Get a list of all machines and their corresponding errors
        ---
        get:
            description: get all machines and all errors
            responses:
                200:
                    description: successful operation, return list of all machines and all errors
                    content:
                        application/json:
                            schema: getAllMachinesSchema
    """
    machineList = []
    cursor = list(db["machineData"].find({}))
    cursor_errorlog = list(db["Errorlog"].find({}))
    for machine in cursor:
        # print(f"{machine}")
        machine["errorlog"] = []
        for error in cursor_errorlog:
            # print(f"{error}")
            if machine["serialnumber"] == error["machine"]:
                machine["errorlog"].append(error)
        machineList.append(machine)
    return Response(json_util.dumps(machineList), mimetype='application/json', status=200)


@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getOneMachine(serialnumber):
    """Get data of a single machine by ID
        ---
        get:
            description: get a single machine
            parameters:
                -   name: serialnumber
                    in: path
                    description: serialnumber to identify specific machine
                    required: true
                    schema:
                        type: string
            responses:
                200:
                    description: successful operation, return data of a single machine
                    content:
                        application/json:
                            schema: getMachineSchema
    """
    cursor = list(db["Machinedata"].find({"serialnumber": serialnumber}))
    cursor_errorlog = list(db["Errorlog"].find({"machine": serialnumber}))
    try:
        cursor[0]["errorlog"] = cursor_errorlog[0]
    except Exception as e:
        cursor[0]["errorlog"] = []
    return Response(json_util.dumps(cursor[0]), mimetype='application/json', status=200)


@app.route('/api/v1/errorlog', methods=['GET'])
def getAllErrors():
    """Get a list of all errors
        ---
        get:
            description: get all errors
            responses:
                200:
                    description: successful operation, return list of all errors
                    content:
                        application/json:
                            schema: errorlogSchema
    """
    crusor_errorlog = list(db["Errorlog"].find({}))
    return Response(json_util.dumps(crusor_errorlog), mimetype='application/json', status=200)


@app.route('/api/v1/machines/allowlist', methods=['GET'])
@authentication
def getAllowlist():
    """Get all IP addresses in allowlist
        ---
        get:
            description: get all IP addresses
            responses:
                200:
                    description: successful operation, return list of allowed IPs
                    content:
                        application/json:
                            schema: allowlistSchema
                404:
                    description: no allowlist found, return empty
                    content:
                        application/json:
                            schema: noneSchema
    """
    allowList = db["Ip_allowlist"].find_one({})
    if (allowList == None):
        return Response(json_util.dumps({}), mimetype='application/json', status=404)
    return Response(json_util.dumps(allowList), mimetype='application/json', status=200)


@app.route('/api/v1/machines/allowlist', methods=['POST'])
@authentication
def insertIp():
    """Add an IP address to the allowlist
        ---
        post:
            description: add an IP address
            requestBody:
                description: create a new entry in the IP allowlist
                content:
                    application/json:
                        schema: IPSchema
                required: true
            responses:
                200:
                    description: successful operation, IP added to list
                    application/json:
                        schema: allowlistSchema
                422:
                    description: invalid IP, return empty
                    application/json:
                        schema: noneSchema 
    """
    ip = request.json['ip']
    if (re.search(IPregex, ip)):
        newAllowlist = db["Ip_allowlist"].find_one_and_update(
            {}, {"$push": {"Ip_Adresses": ip}}, upsert=True, return_document=True)
        return Response(json_util.dumps(newAllowlist), mimetype='application/json', status=200)
    # code 422 unprocessable entity
    return Response(json_util.dumps({}), mimetype='application/json', status=422)


@app.route('/api/v1/machines/allowlist', methods=['DELETE'])
@authentication
def deleteIp():
    """Delete an entry in the allowlist
        ---
        delete:
            description: delete specific IP address from list
            responses:
                200:
                    description: successful operation, return new list of allowed IPs
                    content:
                        application/json:
                            schema: allowlistSchema
                404:
                    description: IP not found in list, return original list
                    content:
                        application/json:
                            schema: allowlistSchema
    """
    ip = request.json['ip']
    allowList = db["Ip_allowlist"].find_one({})
    newList = allowList["Ip_Adresses"]
    if (ip not in newList):
        return Response(json_util.dumps(allowList), mimetype='application/json', status=404)
    newList.remove(ip)
    updatedList = db["Ip_allowlist"].find_one_and_update(
        {}, {"$set": {"Ip_Adresses": newList}}, return_document=True
    )
    return Response(json_util.dumps(updatedList), mimetype='application/json', status=200)


@app.route('/api/v1/login', methods=['POST'])
def login():
    """Login to API
        ---
        post:
            description: login to API
            requestBody:
                description: login to API
                content:
                    application/json:
                        schema: loginSchema
                required: true
            responses:
                200:
                    description: successful operation, return true
                    content:
                        application/json:
                            schema: loginResponseSchema
                401:
                    description: invalid credentials, return false
                    content:
                        application/json:
                            schema: loginResponseSchema
    """
    username = request.json['username']
    password = request.json['password']
    if (username in users and users[username] == password):
        return Response(json_util.dumps({"successLogin": True}), mimetype='application/json', status=200)
    return Response(json_util.dumps({"successLogin": False}), mimetype='application/json', status=401)


def create_app():
    try:
        with app.app_context():
            # app.run(host="0.0.0.0", port=5001)
            app.run(host="0.0.0.0", port=5000)
    except Exception as e:
        logging.debug(f"DEBUG TEST IST ES HIER?{e}")
