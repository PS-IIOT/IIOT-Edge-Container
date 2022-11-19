

class Rpcconnection:
    def __init__(self,ip,port=80):
        self.HOST = ip
        self.PORT = port


    def send_data(self, converted_data):
        print("send_data augerufen", converted_data)

