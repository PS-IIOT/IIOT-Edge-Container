from collections import deque
import json
import os

from deamon.data_converter import Dataconverter
from .database import Database


class Datahandler:
    def __init__(self, rpc) -> None:
        self.que = deque()  
        self.conv_que = deque()
        self.rpc = rpc
        self.data_converter = Dataconverter()

    def store_que(self, data, timestamp):
        self.que.append(data)
        self.conversion(timestamp)

    def conversion(self, timestamp):
        conv_json_object = self.data_converter.conversion(
            timestamp, self.que.popleft())
        self.conv_que.append(conv_json_object)
        try:
            self.rpc.send_data(conv_json_object)
        except Exception as e:
            print(f"Failed to send Data: {e}")
        
        print("Converted JSON Object :" +
            str(self.conv_que[len(self.conv_que)-1])+"\n")
        serialno = conv_json_object['tags']['serialnumber']
        Database.replace(serialno, conv_json_object)

    def printConv_list(self):
        print(f"Liste aller Konvertierten Daten{self.conv_que}")
