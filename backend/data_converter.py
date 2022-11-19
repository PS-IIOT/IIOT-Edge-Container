from collections import deque
import json
import os

class Dataconverter:
    def __init__(self, rpc) -> None:
        self.que = deque()         #Using List as Que becaus we need FiFo if we use more then one machine
        self.conv_list = []
        self.rpc = rpc
            
    def store_que(self,data,timestamp):
        self.que.append(data)
        self.conversion(timestamp)

    def conversion(self,timestamp):
        json_object = json.loads(self.que.popleft())
        data = {"measurement": str,"tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}
        data["measurement"] = json_object['data'][0]
        data['tags']['serialnumber'] = json_object['data'][0]
        data['values'][0]['temp'] = json_object['data'][6]
        data['values'][0]['uptime'] = json_object['data'][7]
        data['values'][0]['cycle'] = json_object['data'][8]
        data['values'][0]['ts'] = str(timestamp)
        conv_json_object = data
        self.conv_list.append(conv_json_object)
        self.last_state(f"{json_object['data'][0]}.json",conv_json_object)
        self.rpc.send_data(conv_json_object)
        #print(threading.active_count())
        print("Converted JSON Object :"+ str(self.conv_list[len(self.conv_list)-1])+"\n")
        
    def last_state(self,filename,data):
        folder_name = "latest-states/"
        os.makedirs(os.path.dirname(folder_name), exist_ok=True)
        try:
            with open("./latest-states/"+filename, "w") as outfile:
                json.dump(data, outfile)
        except Exception as e:
            print(("Exception saving state: %s" % str(e)))