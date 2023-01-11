import socket
import threading
from datetime import *
from .database import Database
import json
import jsonschema
from jsonschema import validate
import logging

logging.basicConfig(level=logging.DEBUG,format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')


class Tcpsocket:
    def __init__(self, ip='127.0.0.1', port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
    
    def __del__(self):
        self.server.close()

    def json_validation(self, tmp):
        pattern = {"type": "object", "minProperties": 2,
        "maxProperties": 2, "properties": {"version": {"type": "string"},
        "data": {"type": "array", "minItems": 9, "maxItems": 9, "prefixItems": [{"type": "string"}, {"type": "boolean"}, {"type": "boolean"}, {"type": "boolean"},
        {"type": "boolean"}, {"type": "boolean"}, {"type": "number"}, {"type": "number"}, {"type": "number"}]}}, "required": ["version", "data"]}
        validate(instance=tmp, schema=pattern)

    def handle_client(self, conn: socket.socket, data_handler, addr):
        while True:
            data = conn.recv(1024)
            try:
                tmp = json.loads(data)
                self.json_validation(tmp)
                if Database.countDocument("Errorlog", {"errorcode": 40, "machine": tmp['data'][0]}) > 0:
                    Database.deleteOne("Errorlog", {"errorcode": 40, "machine": tmp['data'][0]})
            except jsonschema.ValidationError as error:
                logging.debug(f"No valid Json: {error.message}")
                Database.replace("Errorlog", {"errorcode": 40, "errormsg": error.message + f", check the JSON Values of Machinesim {tmp['data'][0]}", "machine": tmp['data'][0]}, {"machine": tmp['data'][0], "errorcode": 40})
            except json.decoder.JSONDecodeError as er:
                logging.debug(f"Empty Object cannot be cast to JSON {er}")
            data_handler.handle_json(data, self.timestamp())
            if not data:
                Database.updateOne("Machinedata", {"$set": {"offline": True}}, {"serialnumber": tmp['data'][0]})
                print(f"Machinesim with Ip: {addr[0]} and Port: {addr[1]} Disconnected!")
                conn.close()
                break

    def listen(self, data_handler) -> None:
        self.server.listen()
        while True:
            conn, addr = self.server.accept()
            tmp = conn.recv(1024)
            cursor = Database.find_ip("Ip_whitelist")
            ip_adresses = cursor["Ip_Adresses"]
            if addr[0] in ip_adresses:
                if Database.countDocument("Errorlog", {"errorcode": 42, "machine": tmp['data'][0]}) > 0:
                    Database.deleteOne("Errorlog", {"errorcode": 42, "machine": tmp['data'][0]})
                print(f"Connected by {addr}")
                thread = threading.Thread(
                    target=self.handle_client, args=(conn, data_handler, addr))
                thread.start()
            else:
                print("Wrong Ip")
                Database.replace("Errorlog", {"errorcode": 42, "errormsg": f"Cannot connect, {addr[0]} not in allowlist",
                "machine": tmp['data'][0]}, {"machine": tmp['data'][0], "errorcode": 42})
                conn.shutdown(socket.SHUT_RDWR)
                conn.close()

    def timestamp(self):
        dt = datetime.now()
        ts = str(dt.isoformat('T'))
        tu = ts[:len(str(ts))-3]+'+01:00'
        return tu
