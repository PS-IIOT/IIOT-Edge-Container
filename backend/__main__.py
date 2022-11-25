import tcp_server
import data_converter
import rpc_connection

if __name__ == '__main__':
    Sock = tcp_server.Tcpsocket()
    Rpc = rpc_connection.Rpcconnection()
    Dc = data_converter.Dataconverter(Rpc)
    Sock.listen(Dc)