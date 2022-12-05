import os
from dotenv import load_dotenv
from pathlib import Path
import requests

class Rpcconnection:
    def __init__(self):
        dotenv_path = Path('backend\.env')
        load_dotenv(dotenv_path=dotenv_path)
        self.HOST = os.getenv('RPC_URL')
        self.user = os.getenv('RPC_USER')
        self.password = os.getenv('RPC_PASSWORD')
        self.sid = None
        self.count = 1
        self.error = {}

    def increment(self):
        self.count +=1

    def session_create(self):
        login_json = {"id": str,"jsonrpc": "2.0","method": "call","params":[str, str, str, {"user": str,"password": str}]}
        login_json["id"] = self.count
        self.increment()
        login_json["params"][0] = "00000000000000000000000000000000"
        login_json["params"][1] = "session"
        login_json["params"][2] = "create"
        login_json["params"][3]["user"] = self.user
        login_json["params"][3]["password"] = self.password
        login = requests.post(self.HOST, json=login_json)
        json_response = login.json()
        self.sid = json_response["result"][1]["sid"]


    def blxpush_push(self, push_data):
        if not self.sid:
            self.session_create()
        push_json = {"id": str,"jsonrpc": "2.0","method": "call","params":[str, str, str, push_data]}
        push_json["id"] = self.count
        self.increment()
        push_json["params"][0] = self.sid
        push_json["params"][1] = "blxpush"
        push_json["params"][2] = "push"
        push = requests.post(self.HOST, json=push_json)
        push_response = push.json()
        if "error" in push_response:
            print("error message: ", push_response["error"]["message"])
            self.sid = None
            self.blxpush_push(push_data)

    def send_data(self, converted_data):
        self.blxpush_push(converted_data)