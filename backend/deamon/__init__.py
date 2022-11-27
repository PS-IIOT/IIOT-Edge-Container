import deamon.data_handler
import deamon.tcp_server
#import deamon.rpc_connection

def start():
    sock = deamon.tcp_server.Tcpsocket()
    #rpc = deamon.rpc_connection.Rpcconnection()
    data_h = deamon.data_handler.Datahandler()
    sock.listen(data_h)