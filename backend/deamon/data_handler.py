from collections import deque
from deamon.data_converter import Dataconverter
from .database import Database
import logging
logging.basicConfig(level=logging.DEBUG,
                    format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')


class Datahandler:
    def __init__(self, rpc) -> None:
        self.que = deque()
        self.rpc = rpc
        self.data_converter = Dataconverter()

    def handle_json(self, data, timestamp):
        self.que.append(data)
        self.conversion(timestamp)

    def conversion(self, timestamp):

        temp = self.que.popleft()
        conv_json_object_rpc = self.data_converter.conversion_rpc(
            timestamp, temp)
        conv_json_object_db = self.data_converter.conversion_db(
            timestamp, temp)
        # print(f"Converted JSON Object: {conv_json_object_db}")
        try:
            wwh_status = self.rpc.wwh_status()
            if (wwh_status["result"][1]["status"]["link"] == "offline"):
                Database.replace("Errorlog", {
                                 "id": 303, "biglinx_connection": wwh_status["result"][1]["status"]["link"]}, {"id": 303})
            else:
                Database.deleteOne("Errorlog", {"id": 303})
            # self.rpc.send_data(conv_json_object_rpc)
        except Exception as e:
            logging.debug(f"RPC Failed to send Data {e}")
        try:
            Database.replace("Machinedata", conv_json_object_db, {
                             "serialnumber": conv_json_object_db["serialnumber"]})
        except TypeError as tr:
            logging.debug(f"{tr}")
