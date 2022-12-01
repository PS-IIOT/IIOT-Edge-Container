import socket
import threading
from datetime import *
import sys

class Tcpsocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
        self.connect = True
    
    def handle_client(self, sock_object:socket.socket, data_handler): 
        while self.connect:
            data = sock_object.recv(1024)
            if not data:
                self.connect = False  
            data_handler.store_que(data,self.timestamp())
        sock_object.close()
    
    def listen(self, data_handler)->None:                         
        self.server.listen()
        while True:      
            sock_object, addr = self.server.accept()
            print(f"Connected by {addr}")
            thread = threading.Thread(target=self.handle_client,args=(sock_object, data_handler))
            thread.start()
       
    def timestamp(self):
        dtn = datetime.now()
        dtif = str(dtn.isoformat('T'))
        dt = dtif[:len(str(dtif))-3]+'Z'
        return dt
