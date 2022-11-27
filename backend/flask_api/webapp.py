from flask import Flask, jsonify, make_response
#from flask import current_app as app
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads


app = Flask(__name__)
def create_app():
    with app.app_context():
        app.run()

app.config["MONGO_URI"] = "mongodb://root:rootpassword@localhost:27017/machineData?authSource=admin"

mongo = PyMongo(app)
db = mongo.db
    
@app.route('/api/v1/machine/<string:serialnumber>', methods=['GET'])
def getMachine(serialnumber):
    cursor = mongo.db[serialnumber].find({'measurement': serialnumber})
    list_cur = list(cursor)
    json_data = dumps(list_cur)
    print(str(json_data))
    return json_data
