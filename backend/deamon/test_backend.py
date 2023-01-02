import unittest
from .rpc_connection import Rpcconnection
from .tcp_server import Tcpsocket
import socket
import jsonschema
from jsonschema import validate


class TestBackend(unittest.TestCase):

    def test_wwh_status(self):
        rpc = Rpcconnection()
        wwh_status = rpc.wwh_status()
        self.assertEqual(1, 2)
        self.assertEqual(wwh_status["result"][1]["status"]["link"], "online")

    def test_json_validator(self):
        server = Tcpsocket()
        with self.assertRaises(jsonschema.ValidationError):
            server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                                   "test4", 4, False, False, False, False, 23.333333333333343, 71, 46]})  # int instead of boolean (4)
        with self.assertRaises(jsonschema.ValidationError):
            server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                                   1, False, False, False, False, False, 23.333333333333343, 71, 46]})   # int instead of string (1)
        with self.assertRaises(jsonschema.ValidationError):
            # no json Object
            server.json_validation("Hallo")
        with self.assertRaises(jsonschema.ValidationError):
            server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                "test4", False, False, False, False, False, 23.333333333333343, 71]})                          # one missing value (last index of the array)
        with self.assertRaises(jsonschema.ValidationError):
            server.json_validation({"test": "adstec-machine-sim-v0", "data": [
                                   "test4", False, False, False, False, False, 23.333333333333343, 71, 46]})   # test instead of version (first key)
        with self.assertRaises(jsonschema.ValidationError):
            server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                                   "test4", False, False, False, False, False, 23.333333333333343, 71, 46]})   # datei instead of data

    def test_db_connection(self):
        None

    def test_rpc_session(self):
        rpc = Rpcconnection()
        rpc_response = rpc.session_create()
        self.assertNotIn("error", rpc_response)
