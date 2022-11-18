import socket
import json
from collections import deque
import argparse
from datetime import *


class Dataconverter:
        def __init__(self) -> None:
            self.que = deque()         #Using List as Que becaus we need FiFo if we use more then one machine
            self.conv_list = []
             

        def store_que(self,data,timestamp):
            self.que.append(data)
            self.conversion(timestamp)
        def conversion(self,timestamp):
            json_object = json.loads(self.que.popleft())
            data = {"data": {"measurement": "machinedata","tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}}
            data['data']['tags']['serialnumber'] = json_object['data'][0]
            data['data']['values'][0]['temp'] = json_object['data'][6]
            data['data']['values'][0]['uptime'] = json_object['data'][7]
            data['data']['values'][0]['cycle'] = json_object['data'][8]
            data['data']['values'][0]['ts'] = str(timestamp)
            conv_json_object = data
            self.conv_list.append(conv_json_object)
            self.last_state("Last_converted_JSON.json",conv_json_object)
            #print("Converted JSON Object :"+ self.conv_list[len(self.conv_list)-1]+"\n")
        
        def last_state(self,filename,data):
            try:
                with open(filename, "w") as outfile:
                    json.dump(data, outfile)
            except Exception as e:
                print(("Exception saving state: %s" % str(e)))

            


            


class Tcpsocket:
    def __init__(self,ip='127.0.0.1',port=7002) -> None:
        self.HOST = ip
        self.PORT = port
    def listen(self,Dc: Dataconverter)->None:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:    #Creates socket-object with alias s
            s.bind((self.HOST, self.PORT))                              #Binds the socket-object to the Ip and Port defined above
            s.listen()                                                  #The socket-object will listen to the Port and Ip-Adress
            conn, addr = s.accept()                                     #conn is the socket-object that got send by the client
            with conn:                                                  
                print(f"Connected by {addr}")                           
                while True:
                    data = conn.recv(1024)                              #data is the JSON object that got send 1024 Bytes max
                    Dc.store_que(data,self.timestamp())
                    if not data:
                        break
                    conn.sendall(data)                      
    def timestamp(self):
        dt = datetime.now()
        ts = str(dt.isoformat('T'))
        tu = ts[:len(str(ts))-3]+'Z'
        return tu


if __name__ == '__main__':
    Sock = Tcpsocket()
    Dc = Dataconverter()
    Sock.listen(Dc)
