import os
from dotenv import load_dotenv
from pathlib import Path
import requests

class Rpcconnection:
    def __init__(self):
        dotenv_path = Path('backend\pers_data.env')
        load_dotenv(dotenv_path=dotenv_path)
        self.HOST = os.getenv('url')
        self.PORT = os.getenv('port')
        self.user = os.getenv('user')
        self.password = os.getenv('password')
        i = 1

    def session_create(self):
        json_login = {"id": str,"jsonrpc": str,"method": str,"params":[str, str, str, {"user": str,"password": str}]}
        json_login["id"] = i
        i+=1
        json_login["jsonrpc"] = "2.0"
        json_login["method"] = "call"
        json_login["params"][0] = "00000000000000000000000000000000"
        json_login["params"][1] = "session"
        json_login["params"][2] = "create"
        json_login["params"][3]["user"] = self.user
        json_login["params"][3]["password"] = self.password
        login = requests.post(self.HOST, json=json_login)
        json_response = login.json()
        sid = json_response["result"][1]["sid"]
        return sid


    def send_data(self, converted_data):
        self.session_create()
