from collections import deque
import json
import os
import logging

logging.basicConfig(level=logging.DEBUG, format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')
class Dataconverter:
    def conversion_db(self,timestamp:str,data_dict:dict)-> dict:
        data_dict_db = {"serialnumber":str,"warning":bool,"error":bool,"ts": str,"uptime": int,"temp": float,"cycle": int,"offline":False}
        data_dict_db['serialnumber'] = data_dict['data'][0]
        data_dict_db['warning'] = data_dict['data'][4]
        data_dict_db['error'] = data_dict['data'][5]
        data_dict_db['temp'] = data_dict['data'][6]
        data_dict_db['uptime'] = data_dict['data'][7]
        data_dict_db['cycle'] = data_dict['data'][8]
        data_dict_db['ts'] = timestamp
        return data_dict_db
    
    def conversion_rpc(self, timestamp:str, data_dict:dict)-> dict:    
        data_dict_rpc = {"measurement": str,"tags": {"serialnumber": str},"values": [{"ts": str,"uptime": int,"temp": float,"cycle": int}]}
        data_dict_rpc["measurement"] = data_dict['data'][0]
        data_dict_rpc['tags']['serialnumber'] = data_dict['data'][0]
        data_dict_rpc['values'][0]['temp'] = data_dict['data'][6]
        data_dict_rpc['values'][0]['uptime'] = data_dict['data'][7]
        data_dict_rpc['values'][0]['cycle'] = data_dict['data'][8]
        data_dict_rpc['values'][0]['ts'] = timestamp
        return data_dict_rpc
