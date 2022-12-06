from collections import deque
import json
import os

class Dataconverter:
    def conversion_db(self,timestamp,data):
        json_object = json.loads(data)
        data = {"serialnumber":str,"warning":bool,"error":bool,"ts": str,"uptime": int,"temp": float,"cycle": int}
        data['serialnumber'] = json_object['data'][0]
        data['warning'] = json_object['data'][4]
        data['error'] = json_object['data'][5]
        data['temp'] = json_object['data'][6]
        data['uptime'] = json_object['data'][7]
        data['cycle'] = json_object['data'][8]
        data['ts'] = str(timestamp)
        return data
    
    
    
    
    def conversion_rpc(self, timestamp, data):
        json_object = json.loads(data)
        data = {"measurement": str,"tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}
        data["measurement"] = json_object['data'][0]
        data['tags']['serialnumber'] = json_object['data'][0]
        data['values'][0]['temp'] = json_object['data'][6]
        data['values'][0]['uptime'] = json_object['data'][7]
        data['values'][0]['cycle'] = json_object['data'][8]
        data['values'][0]['ts'] = str(timestamp)
        return data
