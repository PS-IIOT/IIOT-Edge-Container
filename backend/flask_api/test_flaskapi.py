import unittest
from .webapp import app


class TestFlaskApi(unittest.TestCase):
    
    def setUp(self) -> None:
        app.config["TESTING"] = True
        app.config["DEBUG"] = False
        self.app = app.test_client()

    def test_getAllMachines(self):
        response = self.app.get('/api/v1/machines')
        self.assertEqual(response.status_code,200)

    def test_getOneMachine(self):
        response = self.app.get("/api/v1/machines/test2")
        self.assertEqual(response.status_code,200)


    def test_getAllErrors(self):
        response = self.app.get("/api/v1/machines/errors")
        self.assertEqual(response.mimetype,"application/json")
        self.assertEqual(response.status_code,200)

