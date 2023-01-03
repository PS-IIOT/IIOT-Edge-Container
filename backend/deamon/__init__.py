import deamon.data_handler
import deamon.tcp_server
import deamon.rpc_connection
from .database import Database
import pymongo
import logging
import deamon.test_backend
logging.basicConfig(level=logging.DEBUG, format='%(module)s:%(asctime)s:%(levelname)s:%(message)s')

def start():
    Database.initialize()
    try:    
        ip_allowlist = Database.findOne("Ip_whitelist",{})
        if(ip_allowlist == None):
            Database.insertOne("Ip_whitelist",{"Ip_Adresses": ["127.0.0.1"]})
        machinData = list(Database.find("Machinedata",{}))
        for machine in machinData:
            if(machine["offline"] == False):
                Database.updateOne("Machinedata",{"$set":{"offline":True}},{"serialnumber":machine["serialnumber"]})
    except Exception as e:
        logging.debug(f"{e}")
    sock = deamon.tcp_server.Tcpsocket()
    rpc = deamon.rpc_connection.Rpcconnection()
    data_h = deamon.data_handler.Datahandler(rpc)
    sock.listen(data_h)
