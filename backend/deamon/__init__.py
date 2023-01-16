import logging

import deamon.data_handler
import deamon.rpc_connection
import deamon.tcp_server
import pymongo

from .database import Database

logging.basicConfig(level=logging.DEBUG, format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')

def start():
    Database.initialize()
    try:    
        ip_allowlist = Database.findOne("Ip_allowlist",{})
        if(ip_allowlist == None):
            Database.insertOne("Ip_allowlist",{"Ip_Adresses": ["127.0.0.1"]})
        machinData = list(Database.find("Machinedata",{}))
        for machine in machinData:
            if(machine["offline"] == False):
                Database.updateOne("machineData",{"$set":{"offline":True}},{"serialnumber":machine["serialnumber"]})
    except Exception as e:
        logging.debug(f"{e}")
    sock = deamon.tcp_server.Tcpsocket()
    rpc = deamon.rpc_connection.Rpcconnection()
    data_h = deamon.data_handler.Datahandler(rpc)
    sock.listen(data_h)
