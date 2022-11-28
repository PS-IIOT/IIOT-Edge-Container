from collections import deque
import json
import os

class Dataconverter:
    def conversion(self, timestamp, data):
        json_object = json.loads(data)
        data = {"measurement": str,"tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}
        data["measurement"] = json_object['data'][0]
        data['tags']['serialnumber'] = json_object['data'][0]
        data['values'][0]['temp'] = json_object['data'][6]
        data['values'][0]['uptime'] = json_object['data'][7]
        data['values'][0]['cycle'] = json_object['data'][8]
        data['values'][0]['ts'] = str(timestamp)
        return data
