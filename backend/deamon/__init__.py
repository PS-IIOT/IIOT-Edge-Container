import deamon.data_handler
import deamon.tcp_server
import deamon.rpc_connection
from .database import Database
import pymongo

def start():
    Database.initialize()
    sock = deamon.tcp_server.Tcpsocket()
    rpc = deamon.rpc_connection.Rpcconnection()
    data_h = deamon.data_handler.Datahandler(rpc)
    sock.listen(data_h)
