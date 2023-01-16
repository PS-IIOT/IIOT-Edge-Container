from collections import deque
from deamon.data_converter import Dataconverter
from .database import Database
import logging
logging.basicConfig(level=logging.DEBUG,format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')


class Datahandler:
    def __init__(self, rpc) -> None:
        self.que = deque()
        self.rpc = rpc
        self.data_converter = Dataconverter()

    def handle_json(self, data:dict, timestamp:str)->None:
        self.que.append(data)
        self.conversion(timestamp)

    def conversion(self, timestamp:str)->None:
        data_dict = self.que.popleft()
        data_dict_rpc = self.data_converter.conversion_rpc(timestamp, data_dict)
        data_dict_db = self.data_converter.conversion_db(timestamp, data_dict)
        try:
            wwh_status = self.rpc.wwh_status()
            link_state = self.rpc.link_state()
            if (link_state["result"][1]["link_state"] == "no"):
                Database.replace("Errorlog", {"errorcode": 42, "errormsg": "Linkstate offline, check WAN port","machine":"IRF 1000"}, {"id": 42})
            else:
                Database.deleteOne("Errorlog", {"id": 42})
                
            if (wwh_status["result"][1]["status"]["link"] == "offline"):
                Database.replace("Errorlog", {"errorcode": 41, "errormsg": "WWH Status "+ wwh_status["result"][1]["status"]["link"]+" check your WWH Connection","machine":"IRF 1000"}, {"id": 41})
            else:
                Database.deleteOne("Errorlog", {"id": 41})
            self.rpc.send_data(data_dict_rpc)
        except Exception as e:
            logging.debug(f"RPC Failed to send Data {e}")
        try:
            Database.replace("Machinedata", data_dict_db,{"serialnumber":data_dict_db["serialnumber"]})
        except TypeError:
            None