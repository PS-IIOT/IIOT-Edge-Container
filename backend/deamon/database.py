from dotenv import load_dotenv
from pathlib import Path
import pymongo
import os


class Database(object):
    # dotenv_path = Path('backend\.env')
    # load_dotenv(dotenv_path=dotenv_path)
    URI = 'mongodb://root:rootpassword@localhost:27017'
    DATABASE = None
    CLIENT = None

    @staticmethod
    def initialize():
        Database.CLIENT = pymongo.MongoClient(Database.URI)
        Database.DATABASE = Database.CLIENT["machineData"]

    @staticmethod
    def find(collection,data):
        Database.DATABASE[collection].find(data)

    @staticmethod
    def update(collection,data):
        Database.DATABASE[collection].update({}, data)
    
    @staticmethod
    def replace(collection,data,dfilter={}):
        Database.DATABASE[collection].replace_one(filter=dfilter, replacement=data, upsert=True)
    
    @staticmethod
    def listCollectionNames():
        return Database.DATABASE.list_collection_names()

    @staticmethod
    def find_ip(collection):
        return Database.DATABASE[collection].find_one()
    
    @staticmethod
    def insertOne(collection,data):
        Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def countDocument(collection,data):
        return Database.DATABASE[collection].count_documents(data)

    @staticmethod
    def deleteOne(collection,data):
        return Database.DATABASE[collection].delete_one(data)

    @staticmethod
    def deleteMany(collection,data):
        return Database.DATABASE[collection].delete_many(data)

    @staticmethod
    def updateOne(collection,data,dfilter={}):
        Database.DATABASE[collection].update_one(filter=dfilter,update=data)

    @staticmethod
    def findOne(collection,data):
        return Database.DATABASE[collection].find_one(data)


    