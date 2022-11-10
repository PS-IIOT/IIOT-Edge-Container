import socket

HOST = "127.0.0.1"  # Standard loopback interface address (localhost)
PORT = 7002  # Port to listen on (non-privileged ports are > 1023)

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:    #Creates socket-object with alias s
    s.bind((HOST, PORT))                                        #Binds the socket-object to the Ip and Port defined above
    s.listen()                                                  #The socket-object will listen to the Port and Ip-Adress
    conn, addr = s.accept()                                     #conn is the socket-object that got send by the client
    with conn:                                                  
        print(f"Connected by {addr}")                           
        while True:
            data = conn.recv(1024)                              #data is the JSON object that got send 
            print("JSON Objekt von Maschinensimulator: " + str(data))
            if not data:
                break
            conn.sendall(data)