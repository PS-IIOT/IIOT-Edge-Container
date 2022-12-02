import socket
import threading
from datetime import *
import sys
from .database import Database
import json

class Tcpsocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
        self.connect = True
    
    def handle_client(self, conn:socket.socket, data_handler): 
        while self.connect:
            data = conn.recv(1024)
            if not data:
                self.connect = False  
            data_handler.store_que(data,self.timestamp())
            conn.send(data)
        conn.close()
    
    def listen(self, data_handler)->None:                         
        self.server.listen()
        while True:
            conn, addr = self.server.accept() 
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
