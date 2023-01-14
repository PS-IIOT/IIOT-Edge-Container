# ads-tec machine data simulator
# Copyright 2022 ads-tec Engineering GmbH
#
# Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

import argparse
import signal
import socket
import sys
import threading
import time
import json


class MachineSim:
    def __init__(self, ip="172.17.0.3", port=7002, speed=10):
        self.uptime = 0
        self.serverip = ip
        self.serverport = port
        self.speed = speed
        self.client = None
        self.connected = False
        self.terminate = False
        self.last_data = None

        signal.signal(signal.SIGINT, self.term)
        signal.signal(signal.SIGTERM, self.term)
        self.start_time = time.time()

        # machine start conditions
        self.cycle = 0
        self.lifetime = 0
        self.temp = 20.0  # current machine temp
        self.temp_env = 20.0  # temp of env = min machine temp

        # machine physical model, parameters - our world is linear ;)
        # Watts/s that accumulate if machine is running > overspeed_sec
        self.overspeed_energy_gain_per_second = 1000.0
        self.overspeed_sec = 15
        # Watts/s that go away if machine is running < overspeed_sec
        self.overspeed_energy_loss_per_second = 500.0
        self.machine_mass = 10.0  # kg for thermal energy capacity
        self.machine_c = 900.0  # thermal capacity
        self.T_error = 71.0  # Machine goes to error if temp is above limit
        self.T_warn = 65.0  # Machine issues warning if temp is above limit

    def step(self):
        warn = False
        err = False
        now_time = time.time()
        self.uptime = now_time - self.start_time + self.lifetime
        if self.speed < self.overspeed_sec:
            Q = self.overspeed_energy_gain_per_second * \
                (self.overspeed_sec - self.speed)
            dT = Q / (self.machine_c * self.machine_mass)
            self.temp = self.temp + dT

        if self.temp > self.temp_env and self.speed >= self.overspeed_sec:
            Q = self.overspeed_energy_loss_per_second * \
                (self.speed - self.overspeed_sec)
            dT = Q / (self.machine_c * self.machine_mass)
            self.temp = self.temp - dT
            if self.temp < self.temp_env:
                self.temp = self.temp_env

        if self.temp > self.T_warn:
            warn = True
        if self.temp > self.T_error:
            err = True

        if not err:
            self.cycle = self.cycle + 1
        a = {"versio": "adstec-machine-sim-v0",
             "data": [args.serial, 4, False, False, warn, err, self.temp, int(self.uptime), self.cycle]}
        self.last_data = a

        time.sleep(self.speed)
        return a

    def load_state(self, datafile):
        try:
            with open(datafile, 'r') as openfile:
                json_object = json.load(openfile)
            self.cycle = json_object['data'][7]
            self.lifetime = json_object['data'][6]
        except Exception as e:
            self.cycle = 0
            self.lifetime = 0

    def save_state(self, datafile, mdata):
        try:
            with open(datafile, "w") as outfile:
                json.dump(mdata, outfile)
        except Exception as e:
            print(("Exception saving state: %s" % str(e)))

    def term(self, signum, frame):
        self.terminate = True

    def close(self):
        self.client.close()
        sys.exit()

    def send(self, cmd):
        try:
            self.client.send(bytes(cmd, encoding="utf-8"))
        except Exception as e:
            print('Failed to send data:{}'.format(e))
            self.connected = False
            time.sleep(10)

    def loop(self, arg):
        while not self.terminate:
            data = self.step()
            if self.connected:
                sim.send(json.dumps(data))
            sim.save_state('machine-state.json', data)
        sim.close()

    def comm_loop(self):
        while not self.connected and not self.terminate:
            try:
                self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            except Exception as e:
                print('Failed to create socket: {}'.format(e))
                time.sleep(10)
                continue
            try:
                self.client.connect((self.serverip, self.serverport))
            except Exception as e:
                print('Failed to connect to {}:{}, {}'.format(
                    self.serverip, self.serverport, e))
                time.sleep(10)
                continue
            self.connected = True


class Ui:
    def __init__(self, sim):
        self.terminate = False
        self.sim = sim

    def ui_loop(self):
        while not self.terminate:
            data = input(
                "Commands: +/- for speed change, x for exit, d for data dump, use Enter to send command!\n")
            if '+' == data:
                self.sim.speed = sim.speed + 1
                print("Speed increased: {}".format(self.sim.speed))
            if '-' == data:
                if self.sim.speed >= 1:
                    self.sim.speed = self.sim.speed - 1
                    print("Speed decreased: {}".format(self.sim.speed))
            if 'x' == data:
                self.sim.terminate = True
                self.terminate = True
            if 'd' == data:
                print("Data: {}".format(self.sim.last_data))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--ip', action='store', type=str, dest="ip",
                        default="172.17.0.3", help='Target IP of data collection server')
    parser.add_argument('--port', action='store', type=str, dest="port",
                        default="7002", help='Target TCP Port of data collection server')
    parser.add_argument('--serial', action='store', type=str, dest="serial",
                        default="AX2022SIM1", help='Machine serial number to report')
    parser.add_argument('--speed', action='store', type=str, dest="speed",
                        default="10", help='Machine speed, cycle time in seconds')
    args = parser.parse_args()

    sim = MachineSim(ip=args.ip, port=int(args.port), speed=int(args.speed))
    sim.load_state('machine-state.json')

    print("ads-tec Machine Simulator v0.1")
    print("------------------------")

    ui = Ui(sim)
    ui_thread = threading.Thread(target=ui.ui_loop)
    ui_thread.start()

    sim_thread = threading.Thread(target=sim.loop, args=(1,))
    sim_thread.start()
    sim_comm_thread = threading.Thread(target=sim.comm_loop)
    sim_comm_thread.start()
