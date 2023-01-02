import unittest
from .rpc_connection import Rpcconnection
from .tcp_server import Tcpsocket
import socket


class TestBackend(unittest.TestCase):

    def test_wwh_status(self):
        rpc = Rpcconnection()
        wwh_status = rpc.wwh_status()
        self.assertEqual(1, 2)
        self.assertEqual(wwh_status["result"][1]["status"]["link"], "online")

    def test_db_connection(self):
        None

    def test_rpc_session(self):
        rpc = Rpcconnection()
        rpc_response = rpc.session_create()
        self.assertNotIn("error", rpc_response)
