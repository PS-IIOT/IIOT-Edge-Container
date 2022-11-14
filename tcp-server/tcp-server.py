import socket
import json
from collections import deque
import argparse



class Datenkonverter:
        def __init__(self) -> None:
             self.que = deque()         #Using List as Que becaus we need FiFo
             self.conv_list = []

        def store_que(self,data):
            self.que.append(data)
            for i in self.que:
                print("Que of JSON Objects" + str(i))
        def conversion(self):
            for i in range(1,len(self.que)):
                json_object = self.que.popleft()
                data = {
                        "data": {
                            "measurement": "iiot.test1",
                            "tags": {
                            "instance": 0
                            },
                            "values": [{
                            "ts": "2022-09-23T13:32:34.119Z",
                            "state": 4,
                            "P": -2147483648
                            }]
                        }
                     }
                self.conv_list.append(data)


            


class TcpSocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
    def connect(self,Dk: Datenkonverter)->None:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:    #Creates socket-object with alias s
            s.bind((self.HOST, self.PORT))                                        #Binds the socket-object to the Ip and Port defined above
            s.listen()                                                  #The socket-object will listen to the Port and Ip-Adress
            conn, addr = s.accept()                                     #conn is the socket-object that got send by the client
            with conn:                                                  
                print(f"Connected by {addr}")                           
                while True:
                    data = conn.recv(1024)                             #data is the JSON object that got send 
                    Dk.store_que(data)
                    if not data:
                        break
                    conn.sendall(data)


if __name__ == '__main__':
    Sock = TcpSocket()
    Dk = Datenkonverter()
    Sock.connect(Dk)
