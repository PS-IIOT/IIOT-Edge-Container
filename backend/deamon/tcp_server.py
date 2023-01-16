import json
import logging
import socket
import threading
from datetime import *

import jsonschema
from jsonschema import validate

from .database import Database
from .json_validation import Validator

logging.basicConfig(level=logging.DEBUG,format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')


class Tcpsocket:
    def __init__(self, ip='0.0.0.0', port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
    
    def handle_client(self, conn: socket.socket, data_handler, addr:tuple) ->None:
        while True:
            json_string = conn.recv(1024)
            if not json_string :
                Database.updateOne("Machinedata", {"$set": {"offline": True}}, {"serialnumber": data_dict ['data'][0]})
                logging.debug(f"Machinesim with Ip: {addr[0]} and Port: {addr[1]} Disconnected!")
                conn.close()
                break
            try:
                data_dict = json.loads(json_string)
                Validator.json_validation(data_dict)
                if Database.countDocument("Errorlog", {"errorcode": 40, "machine": data_dict ['data'][0]}) > 0:
                    Database.deleteOne("Errorlog", {"errorcode": 40, "machine": data_dict ['data'][0]})
            except jsonschema.ValidationError as error:
                logging.debug(f"No valid Json: {error.message}")
                Database.replace("Errorlog", {"errorcode": 40, "errormsg": error.message + f", check the JSON Output of Machine: {data_dict ['data'][0]}", 
                "machine": data_dict ['data'][0]}, 
                {"machine": data_dict ['data'][0], "errorcode": 40})
            except json.decoder.JSONDecodeError as er:
                logging.debug(f"Faild to decode JSON {er}")
            data_handler.handle_json(data_dict , self.timestamp())
            

    def listen(self, data_handler) -> None:
        self.server.listen()
        logging.debug(f"Server is listening on {self.HOST}:{self.PORT} for incoming connections")
        while True:
            conn, addr = self.server.accept()
            json_string = conn.recv(1024)
            logging.debug(json_string)
            data_dict = json.loads(json_string)
            data_keys = list(data_dict.keys())
            cursor = Database.findOne("Ip_allowlist", {})
            ip_adresses = cursor["Ip_Adresses"]
            logging.debug(f"Machine with IP-Address: {addr[0]} wants to connect. Checking if IP-Address is in allowlist!")
            if "data" in data_keys:
                if addr[0] in ip_adresses:
                    if Database.countDocument("Errorlog", {"errorcode": 42, "machine": data_dict['data'][0]}) > 0:
                        Database.deleteOne("Errorlog", {"errorcode": 42, "machine": data_dict['data'][0]})
                    logging.debug(f"Machine with ip: {addr[0]} connected")
                    thread = threading.Thread(target=self.handle_client, args=(conn, data_handler, addr))           #creating a new Thread that handles the connected tpc client
                    thread.start()
                else:
                    logging.debug(f"Machine with ip: {addr[0]} not in allowlist, connnection rejected")
                    Database.replace("Errorlog", {"errorcode": 42, "errormsg": f"Cannot connect, {addr[0]} not in allowlist",
                    "machine": data_dict['data'][0]}, {"machine": data_dict['data'][0], "errorcode": 42})
                    conn.shutdown(socket.SHUT_RDWR)
                    conn.close()
            else:
                logging.debug(f"No data key in JSON Object Machine with ip: {addr[0]} rejected")
                conn.shutdown(socket.SHUT_RDWR)
                conn.close()

    def timestamp(self)-> str:
        ts_isoT = str(datetime.now().isoformat('T'))
        ts_isoT_CET = ts_isoT [:len(ts_isoT )-3]+'+01:00'
        return ts_isoT_CET
