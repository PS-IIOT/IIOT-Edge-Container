import unittest
from unittest.mock import patch
import flask_api.webapp
from flask_api.webapp import app
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

    def test_insertIp(self):
        response_toomanyNibble = self.open_with_auth("/api/v1/machines/allowlist","POST","admin","admin",{"ip":"127.0.0.1.1"})
        response_toobigNibble = self.open_with_auth("/api/v1/machines/allowlist","POST","admin","admin",{"ip":"1271.0.0.1"})
        self.assertEqual(response_toomanyNibble.status_code,422)
        self.assertEqual(response_toobigNibble.status_code,422)

    def test_login(self):
        response_correctLogin = self.app.post("/api/v1/login",json ={"username":"admin","password":"admin"})
        response_wrongUser = self.app.post("/api/v1/login",json ={"username":"hacker","password":"admin"})
        response_wrongPassowrd = self.app.post("/api/v1/login",json ={"username":"hacker","password":"hacker"})
        self.assertEqual(response_correctLogin.status_code,200)
        self.assertEqual(response_wrongUser.status_code,401)
        self.assertEqual(response_wrongPassowrd.status_code,401)

    

if __name__ == "__main__":
    unittest.main()

