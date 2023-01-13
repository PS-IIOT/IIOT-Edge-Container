import socket
import threading
from datetime import *
from .database import Database
import json
import jsonschema
from jsonschema import validate
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')


class Tcpsocket:
    def __init__(self, ip="0.0.0.0", port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))

    def handle_client(self, conn: socket.socket, data_handler, addr):
        while True:
            data = conn.recv(1024)
            try:
                tmp = json.loads(data)
                pattern = {"type": "object", "properties": {"version": {"type": "string"},
                                                            "data": {"type": "array", "prefixItems": [{"type": "string"}, {"type": "boolean"}, {"type": "boolean"}, {"type": "boolean"},
                                                                                                      {"type": "boolean"}, {"type": "boolean"}, {"type": "number"}, {"type": "number"}, {"type": "number"}]}}}
                validate(instance=tmp, schema=pattern)
                if Database.countDocument("Errorlog", {"id": 202, "machine": tmp['data'][0]}) > 0:
                    Database.deleteOne(
                        "Errorlog", {"id": 202, "machine": tmp['data'][0]})
            except jsonschema.ValidationError as error:
                logging.debug(f"No valid Json: {error.message}")
                Database.replace("Errorlog", {"id": 202, "errormsg": error.message, "machine": tmp['data'][0]}, {
                                 "machine": tmp['data'][0], "id": 202})
            except json.decoder.JSONDecodeError as er:
                logging.debug(f"Empty Object cannot be cast to JSON {er}")
            data_handler.handle_json(data, self.timestamp())
            if not data:
                Database.updateOne("machineData", {"$set": {"offline": True}}, {
                                   "serialnumber": tmp['data'][0]})
                logging.debug(f"Machinesim with Ip: {addr[0]} and Port: {addr[1]} Disconnected!")
                conn.close()
                break

    def listen(self, data_handler) -> None:
        self.server.listen()
        logging.debug(f"Server is listening on for TCP-Connections {self.HOST}:{self.PORT}")
        while True:
            conn, addr = self.server.accept()
            logging.debug(f"Machine with IP-Adress: {addr} trys to connect!")
            
            whitelist = Database.find_ip("Ip_whitelist")
            
            if addr[0] in whitelist['Ip_Adresses']:
                logging.debug(f"New Machine Connected by IP-Address: {addr}")
                thread = threading.Thread(
                    target=self.handle_client, args=(conn, data_handler, addr))
                thread.start()
            else:
                logging.debug("IP-Address not in allowlist, Connection refused")
                conn.shutdown(socket.SHUT_RDWR)
                conn.close()

            

    # def listen(self, data_handler) -> None:
    #     self.server.listen()
    #     print(f"Server is listening on for TCP-Connections {self.HOST}:{self.PORT}")
    #     while True:
    #         conn, addr = self.server.accept()
    #         print(f'DEBUG Address: {addr} trys to connect!')
    #         cursor = Database.find_ip("Ip_whitelist")
    #         if addr[0] in ip_adresses:
    #             if Database.countDocument("Errorlog", {"errorcode": 42, "machine": data['data'][0]}) > 0:
    #                 Database.deleteOne("Errorlog", {"errorcode": 42, "machine": data['data'][0]})
    #             print(f"Connected by {addr}")
    #             thread = threading.Thread(
    #                 target=self.handle_client, args=(conn, data_handler, addr))
    #             thread.start()
    #         else:
    #             print("Wrong Ip")
    #             # Database.replace("Errorlog", {"errorcode": 42, "errormsg": f"Cannot connect, {addr[0]} not in allowlist",
    #             # "machine": data['data'][0] }, {"machine": data['data'][0], "errorcode": 42})
    #             conn.shutdown(socket.SHUT_RDWR)
    #             conn.close()

    def timestamp(self):

        dt = datetime.now()
        ts = str(dt.isoformat('T'))
        tu = ts[:len(str(ts))-3]+'+01:00'
        return tu
