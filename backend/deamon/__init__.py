import tcp_server
import data_handler
import rpc_connection

def start():
    sock = tcp_server.Tcpsocket()
    rpc = rpc_connection.Rpcconnection()
    data_handler = data_handler.Datahandler(rpc)
    sock.listen(data_handler)