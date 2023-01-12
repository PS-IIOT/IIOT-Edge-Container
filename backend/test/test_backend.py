import unittest
from deamon.tcp_server import Tcpsocket
import jsonschema
import socket

class TestBackend(unittest.TestCase):
    def setUp(self) -> None:
        self.server = Tcpsocket()
    def tearDown(self) -> None:
        self.server.__del__()

    def test_json_validator(self):
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                "test4", 4, False, False, False, False, 23.333333333333343, 71, 46]})            # int instead of boolean (4)
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"version": "adstec-machine-sim-v0", "data": [
                1, False, False, False, False, False, 23.333333333333343, 71, 46]})              # int instead of string (1)
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation("Hallo")                                                 # string instead of object
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"version": "adstec-machine-sim-v0", "daten": [          # daten instead of data
                "test4", False, False, False, False, False, 23.333333333333343, 71, 46]})
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"test": "adstec-machine-sim-v0", "data": [              # test instead of version
                "test4", False, False, False, False, False, 23.333333333333343, 71, 46]})
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"version": "adstec-machine-sim-v0", "data": [           # 1 more property
                "test4", False, False, False, False, False, 23.333333333333343, 71, 46], "test": "test"})
        with self.assertRaises(jsonschema.ValidationError):
            self.server.json_validation({"version": "adstec-machine-sim-v0", "data": [           # 1 less item in array
                "test4", False, False, False, False, False, 23.333333333333343, 71]})
    

if __name__ == "__main__":
    unittest.main()