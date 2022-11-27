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
        Database.DATABASE = Database.CLIENT["maschineData"]

    @staticmethod
    def insert(collection, data):
        Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def listDatabases():
        print(Database.CLIENT.list_databases())
