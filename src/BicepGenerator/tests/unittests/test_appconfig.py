import unittest
import os
import sys

modulePath = os.path.join(os.getcwd(), 'src', 'BicepGenerator')
sys.path.insert(1, modulePath)

from appconfig import AppConfig

class TestAppConfig(unittest.TestCase):
    def setUp(self) -> None:
        return super().setUp()
    
    def test_dotenv_exist(self):
        
        appconfig = AppConfig()
        
        self.assertIsNot(appconfig.AZSTORAGE_CONN_STRING, f'{appconfig.AZSTORAGE_CONN_STRING} is empty')
        