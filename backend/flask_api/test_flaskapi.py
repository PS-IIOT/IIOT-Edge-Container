import unittest
from .webapp import app
import base64


class TestFlaskApi(unittest.TestCase):
    
    def setUp(self) -> None:
        app.config["TESTING"] = True
        app.config["DEBUG"] = False
        self.app = app.test_client()
    
    def tearDown(self) -> None:
        pass

    def open_with_auth(self, url, method, username, password,data=None):
        if method == 'GET':
            return self.app.open(url,
                method=method,
                headers={
                    'Authorization': 'Basic ' + base64.b64encode(bytes(username + \
                    ":" + password,"ascii")).decode("ascii")
                },
            )
        else:
            return self.app.open(url,
                method=method,
                headers={
                    'Authorization': 'Basic ' + base64.b64encode(bytes(username + \
                    ":" + password,"ascii")).decode("ascii")
                },
                json=data
            )

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

    def test_insertIp(self):
        response = self.open_with_auth("/api/v1/machines/allowlist","POST","admin","admin",{"ip":"127.0.0.1"})
        self.assertEqual(response.mimetype,"application/json")
        self.assertEqual(response.status_code,200)
    
    def test_deleteIp(self):
        response = self.open_with_auth("/api/v1/machines/allowlist","DELETE","admin","admin",{"ip":"127.0.0.1"})
        self.assertEqual(response.mimetype,"application/json")
        self.assertEqual(response.status_code,200)

    def test_getAllowlist(self):
        response = self.open_with_auth("/api/v1/machines/allowlist","GET","admin","admin")
        self.assertEqual(response.mimetype,"application/json")
        self.assertEqual(response.status_code,200)


if __name__ == "__main__":
    unittest.main()

