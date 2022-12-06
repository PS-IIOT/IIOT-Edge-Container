from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin"
mongo = PyMongo(app)
db = mongo.db


@app.route('/api/v1/machines', methods=['GET'])
def getAll():
    collist = db.list_collection_names()
    datalist = list()
    for col in collist:
        rec = db[col].find()
        rec_list_element = list(rec)
        json_data = dumps(rec_list_element[0])
        datalist.append(json.loads(json_data))
    return datalist

@app.route('/api/v1/machines/<string:serialnumber>', methods=['GET'])
def getMachine(serialnumber):
    cursor = db[serialnumber].find({'measurement': serialnumber})
    list_cur = list(cursor)
    json_data = dumps(list_cur[0])
    print(str(json_data))
    return json_data

def create_app():
    with app.app_context():
        app.run()