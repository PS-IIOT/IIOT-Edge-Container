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
    
    def handle_client(self,conn:socket.socket,Dc): 
        while self.connect:
            data = conn.recv(1024)
            if not data:
                self.connect = False  
            Dc.store_que(data,self.timestamp())
            conn.send(data)
        conn.close()
        print(threading.active_count())
    
    def listen(self, Dc)->None:                         
        try:
            self.server.listen()
            while True:
                conn, addr = self.server.accept()
                print(f"Connected by {addr}")
                thread = threading.Thread(target=self.handle_client,args=(conn,Dc))
                thread.start()
                #if(threading.active_count()<=1):
                    #print("Ich hasse threads")
                    #break
        except KeyboardInterrupt:
            print ('Interrupted')
            sys.exit(0)
        '''try:
            self.server.listen()
            conn, addr = self.server.accept()                                    
            with conn:                                                  
                print(f"Connected by {addr}")                           
                while True:
                    data = conn.recv(1024)                              
                    Dc.store_que(data,self.timestamp())
                    if not data:
                        break
                    conn.sendall(data)
        except Exception as e:
            print(f"Machinesim disconnected {addr}")'''
            
    def timestamp(self):
        dt = datetime.now()
        ts = str(dt.isoformat('T'))
        tu = ts[:len(str(ts))-3]+'Z'
        return tu