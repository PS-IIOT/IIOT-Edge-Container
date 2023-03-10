import logging
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

logging.basicConfig(level=logging.DEBUG,format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')

# !!! TODO in future: add aiohttp for async requests !!!
# so far this is a syncronous implementation with python requests
# to make the program asyncronous, aiohttp should be used
# this would allow to send multiple requests at the same time
# if the IRF1000 is not reachable, the program will wait for the timeout
# this is not a problem for the current use case, but should be changed in the future
# to make the program more robust and scalable for multiple IRF1000s and other devices


class Rpcconnection:
    def __init__(self)->None:
        dotenv_path = Path('backend/.env')
        load_dotenv(dotenv_path=dotenv_path)
        self.HOST = os.getenv('RPC_URL')
        self.user = os.getenv('RPC_USER')
        self.password = os.getenv('RPC_PASSWORD')
        self.sid = None
        self.count = 1
        self.error = {}

    def increment(self)->None:
        self.count +=1

    def session_create(self)->None:
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

    def blxpush_push(self, push_data:dict)->None:
        if not self.sid:
            self.session_create()
        logging.debug(f"Blxpush Push, with SID: {self.sid}")
        push_json = {"id": str,"jsonrpc": "2.0","method": "call","params":[str, str, str, push_data]}
        push_json["id"] = self.count
        self.increment()
        push_json["params"][0] = self.sid
        push_json["params"][1] = "blxpush"
        push_json["params"][2] = "push"
        push = requests.post(self.HOST, json=push_json)
        push_response = push.json()
        if "error" in push_response:
            if push_response["error"]["message"] == "Access denied":
                logging.debug(f"Access Denied, SID: {self.sid}")
                self.sid = None
                self.blxpush_push(push_data)
            logging.debug(f"ERROR IN PUSH RES (Check if blxpush on IRF1000 is connected): error message: {push_response['error']['message']}")


    def link_state(self)->dict:
        if not self.sid:
            self.session_create()
        requestData = {"function": "link_state", "parameters": ["eth1", ""]}
        push_json = {"id": str,"jsonrpc": "2.0","method": "call","params":[str, str, str, requestData]}
        push_json["id"] = self.count
        self.increment()
        push_json["params"][0] = self.sid
        push_json["params"][1] = "status"
        push_json["params"][2] = "get"
        push = requests.post(self.HOST, json=push_json)
        push_response = push.json()
        if "error" in push_response:
            if push_response["error"]["message"] == "Access denied":
                logging.debug(f"Access Denied, SID: {self.sid}")
                self.sid = None
                self.link_state()
            logging.debug(f"ERROR IN PUSH RES (Check if blxpush on IRF1000 is connected): error message: {push_response['error']['message']}")
        return push_response

    def wwh_status(self)->dict:
        if not self.sid:
            self.session_create()
        push_json = {"id": str,"jsonrpc": "2.0","method": "call","params":[str, str, str, {}]}
        push_json["id"] = self.count
        self.increment()
        push_json["params"][0] = self.sid
        push_json["params"][1] = "wwh"
        push_json["params"][2] = "status"
        push = requests.post(self.HOST, json=push_json)
        push_response = push.json()
        if "error" in push_response:
            if push_response["error"]["message"] == "Access denied":
                logging.debug(f"Access Denied, SID: {self.sid}")
                self.sid = None
                self.wwh_status()
            logging.debug(f"ERROR IN PUSH RES (Check if blxpush on IRF1000 is connected): error message: {push_response['error']['message']}")
        return push_response

    def send_data(self, converted_data)->None:
        self.blxpush_push(converted_data)