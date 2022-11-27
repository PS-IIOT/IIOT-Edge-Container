from collections import deque
import json
import os

from deamon.data_converter import Dataconverter
from .database import Database


class Datahandler:
    def __init__(self, rpc) -> None:
        self.que = deque()  # Using List as Que becaus we need FiFo if we use more then one machine
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
        # self.last_state(f"{json_object['data'][0]}.json",conv_json_object)
        # self.rpc.send_data(conv_json_object)
        print("Converted JSON Object :" +
              str(self.conv_que[len(self.conv_que)-1])+"\n")
        # FIXME: Jeder Thread soll seine zeile in der DB wieder übeschreiben
        Database.insert('mymaschine', conv_json_object)
    """ def last_state(self,filename,data):
        folder_name = "latest-states/"
        os.makedirs(os.path.dirname(folder_name), exist_ok=True)
        try:
            with open("./latest-states/"+filename, "w") as outfile:
                json.dump(data, outfile)
        except Exception as e:
            print(("Exception saving state: %s" % str(e))) """

    def printConv_list(self):
        print(f"Liste aller Konvertierten Daten{self.conv_que}")
