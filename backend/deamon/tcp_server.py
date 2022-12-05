import socket
import threading
from datetime import *
from .database import Database
import json
import jsonschema
from jsonschema import validate

class Tcpsocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
        self.connect = True
        self.error = {}
    
    def handle_client(self, conn:socket.socket, data_handler): 
        while self.connect:
            data = conn.recv(1024)
            try:    
                tmp = json.loads(data)
                pattern = {"type":"object","properties":{"version":{"type":"string"},
                "data":{"type":"array","prefixItems":[{"type":"string"},{"type":"boolean"},{"type":"boolean"},{"type":"boolean"},
                {"type":"boolean"},{"type":"boolean"},{"type":"number"},{"type":"number"},{"type":"number"}]}}}
                validate(instance=tmp, schema=pattern)
                if tmp['data'][0] in self.error:
                    self.error.update({tmp['data'][0]:False})
                    Database.deleteOne("Errorlog",{"id": 202,"machine":tmp['data'][0]})
                    print(str(self.error))
            except jsonschema.ValidationError as e:
                print(f"No valid Json: {e.message}")
                Database.replace("Errorlog",{"id":202,"errormsg": e.message,"machine":tmp['data'][0]},{"machine":tmp['data'][0],"id":202})
                self.error.update({tmp['data'][0]:True})
                print(str(self.error))
            if not data:
                self.connect = False            
            data_handler.store_que(data,self.timestamp())
        conn.close()
    
    def listen(self, data_handler)->None:                         
        self.server.listen()
        while True:
            conn, addr = self.server.accept() 
            if Database.countDocument("Ip_whitelist",{"_id":1}) > 0:
                cursor = Database.find_ip("Ip_whitelist")
                ip_adresses = cursor["Ip_Adresses"]
            else:
                Database.insertOne("Ip_whitelist",{"_id":1,"Ip_Adresses": ["127.0.0.1","187.69.69.1"]})
                cursor = Database.find_ip("Ip_whitelist")
                ip_adresses = cursor["Ip_Adresses"]
            if addr[0] in ip_adresses:
                print(f"Connected by {addr}")
                thread = threading.Thread(target=self.handle_client,args=(conn, data_handler))
                thread.start()
                
            else:
                print("Wrong Ip")
                conn.shutdown(socket.SHUT_RDWR)
                conn.close()
    def timestamp(self):
        dt = datetime.now()
        ts = str(dt.isoformat('T'))
        tu = ts[:len(str(ts))-3]+'Z'
        return tu
