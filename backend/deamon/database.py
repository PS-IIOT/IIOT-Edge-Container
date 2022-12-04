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
        Database.DATABASE[collection].insert_one(data)

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
    def listDatabases():
        print(Database.CLIENT.list_databases())
    
    @staticmethod
    def listCollectionNames():
        return Database.DATABASE.list_collection_names()

    @staticmethod
    def find_ip(collection):
        return Database.DATABASE[collection].find_one()

    @staticmethod
    def create_Collection(collection):
        Database.DATABASE.create_collection(collection)
    
    @staticmethod
    def insertOne(collection,data):
        Database.DATABASE[collection].insert_one(data)


    @staticmethod
    def countDocument(collection,data):
        return Database.DATABASE[collection].count_documents(data)


    