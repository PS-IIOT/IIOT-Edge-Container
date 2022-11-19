import tcp_server
import data_converter

if __name__ == '__main__':
    Sock = tcp_server.Tcpsocket()
    Dc = data_converter.Dataconverter()
    Sock.listen(Dc)