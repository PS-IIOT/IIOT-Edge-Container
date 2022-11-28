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
    def insert(collection, data):
        #Database.DATABASE.createCollection(collection,{max : 1})
        Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def find(collection,data):
        Database.DATABASE[collection].find_one(data)

    @staticmethod
    def update(collection,data):
        Database.DATABASE[collection].update({}, data)
    
    @staticmethod
    def replace(collection,data):
        Database.DATABASE[collection].replace_one(filter={}, replacement=data, upsert=True)

    @staticmethod
    def listDatabases():
        print(Database.CLIENT.list_databases())
    
    @staticmethod
    def listCollectionNames(collection):
        return Database.DATABASE.list_collection_names()