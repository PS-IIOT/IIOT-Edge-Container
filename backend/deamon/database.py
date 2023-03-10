import os
from pathlib import Path

import pymongo
from dotenv import load_dotenv


class Database(object):
    dotenv_path = Path('backend/.env')
    load_dotenv(dotenv_path=dotenv_path)
    URI = os.getenv('MONGO_URI')
    #URI = 'mongodb://root:rootpassword@localhost:27017'
    DATABASE = None
    CLIENT = None

    @staticmethod
    def initialize()->None:
        Database.CLIENT = pymongo.MongoClient(Database.URI)
        Database.DATABASE = Database.CLIENT["machineData"]

    @staticmethod
    def update(collection, data)->None:
        Database.DATABASE[collection].update({}, data)

    @staticmethod
    def replace(collection, data, dfilter={})->None:
        Database.DATABASE[collection].replace_one(
            filter=dfilter, replacement=data, upsert=True)

    @staticmethod
    def listCollectionNames():
        return Database.DATABASE.list_collection_names()

    @staticmethod
    def insertOne(collection, data):
        Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def countDocument(collection, data):
        return Database.DATABASE[collection].count_documents(data)

    @staticmethod
    def deleteOne(collection, data):
        return Database.DATABASE[collection].delete_one(data)

    @staticmethod
    def deleteMany(collection, data):
        return Database.DATABASE[collection].delete_many(data)

    @staticmethod
    def updateOne(collection, data, dfilter={}):
        Database.DATABASE[collection].update_one(filter=dfilter, update=data)

    @staticmethod
    def findOne(collection, data):
        return Database.DATABASE[collection].find_one(data)

    @staticmethod
    def find(collection, data):
        return Database.DATABASE[collection].find(data)
