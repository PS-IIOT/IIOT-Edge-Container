from flask import Flask
from flask_restful import Resource, Api
from flask import current_app as app

app = Flask('api')
api = Api(app)

class AllMachines(Resource):
    def __init__(self,Dc):
        self.dc = Dc
    
    def get(self):
        return self.dc.conv_que
    
class SingularMachine(Resource):
    def __init__(self, Dc):
        self.Dc = Dc
        self.q = self.Dc.conv_que

    def get(self, serialnumber):
        for i in self.q.queue:
            if self.q[i]['tags']['serialnumber'] == serialnumber:
                self.temp = self.q[i]['values']['temp']
                self.cycle = self.q[i]['values']['cycle']
                self.uptime = self.q[i]['values']['uptime']
        return {"temp":self.temp, "cycle":self.cycle, "uptime":self.uptime}

api.add_resource(AllMachines, "/api/v1/machines")
api.add_resource(SingularMachine, "/api/v1/machines/<string:serialnumber>")