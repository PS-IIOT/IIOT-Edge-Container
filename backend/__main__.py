from multiprocessing import Process

import deamon
import flask_api

if __name__ == '__main__':
    p1 = Process(target=deamon.start)
    p1.start()
    p2 = Process(target=flask_api.webapp.create_app)
    p2.start()
    p1.join()
    p2.join()