import os
from dotenv import load_dotenv
from pathlib import Path

class Rpcconnection:
    def __init__(self,url='192.168.0.254/rpc',port=80):
        dotenv_path = Path('backend\pers_data.env')
        load_dotenv(dotenv_path=dotenv_path)
        self.HOST = os.getenv('ip')
        self.PORT = os.getenv('port')
        self.user = os.getenv('user')
        self.password = os.getenv('password')


    def send_data(self, converted_data):
        print('rpc-ip: ', self.HOST)

