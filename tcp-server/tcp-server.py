import socket
import json
from collections import deque
import threading
from datetime import *
import test

class Dataconverter:
        def __init__(self) -> None:
            self.que = deque()         #Using List as Que becaus we need FiFo if we use more then one machine
            self.conv_list = []
             

        def store_que(self,data,timestamp):
            self.que.append(data)
            self.conversion(timestamp)
        def conversion(self,timestamp):
            json_object = json.loads(self.que.popleft())
            data = {"data": {"measurement": str,"tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}}
            data["data"]["measurement"] = json_object['data'][0]
            data['data']['tags']['serialnumber'] = json_object['data'][0]
            data['data']['values'][0]['temp'] = json_object['data'][6]
            data['data']['values'][0]['uptime'] = json_object['data'][7]
            data['data']['values'][0]['cycle'] = json_object['data'][8]
            data['data']['values'][0]['ts'] = str(timestamp)
            conv_json_object = data
            self.conv_list.append(conv_json_object)
            self.last_state(f"Last_converted_JSON {threading.get_ident()}.json",conv_json_object)
            #print(threading.active_count())
            print("Converted JSON Object :"+ str(self.conv_list[len(self.conv_list)-1])+"\n")
        
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
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((self.HOST, self.PORT))
        self.connect = True
    
    def handle_client(self,conn:socket.socket,Dc:Dataconverter): 
        while self.connect:
            data = conn.recv(1024)
            if not data:
                self.connect = False  
            Dc.store_que(data,self.timestamp())
            conn.send(data)
        conn.close()
        print(threading.active_count())
    
    def listen(self,Dc: Dataconverter)->None:                         
        self.server.listen()
        while True:
            conn, addr = self.server.accept()
            print(f"Connected by {addr}")
            thread = threading.Thread(target=self.handle_client,args=(conn,Dc))
            thread.start()
            if(threading.active_count()<=1):
                print("Ich hasse threads")
                break
            

        

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


if __name__ == '__main__':
    Sock = Tcpsocket()
    Dc = Dataconverter()
    Sock.listen(Dc)

