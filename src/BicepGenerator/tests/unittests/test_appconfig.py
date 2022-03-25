import unittest

def load_shared_modules():
    import os
    import sys
    # adding shared folder path to system paths
    modulePath = os.path.join(os.getcwd(),'src', 'BicepGenerator')
    print(modulePath)
    sys.path.insert(1,modulePath)
load_shared_modules()



from appconfig import AppConfig

class TestAppConfig(unittest.TestCase):
    def setUp(self) -> None:
        return super().setUp()
    
    def test_envvars_exist(self):
        
        appconfig = AppConfig()
        
        self.assertIsNot(appconfig.AZSTORAGE_CONN_STRING, f'{appconfig.AZSTORAGE_CONN_STRING} is empty')
        self.assertIsNot(appconfig.BICEP_AZSTORAGE_CONTAINER, f'{appconfig.BICEP_AZSTORAGE_CONTAINER} is empty')
        self.assertIsNot(appconfig.AZURE_SERVICE_BUS_CONN_STRING, f'{appconfig.AZURE_SERVICE_BUS_CONN_STRING} is empty')
        self.assertIsNot(appconfig.BICEP_GEN_COMMAND_QUEUE_NAME, f'{appconfig.BICEP_GEN_COMMAND_QUEUE_NAME} is empty')
        self.assertIsNot(appconfig.COMPRESS_MSG, f'{appconfig.COMPRESS_MSG} is empty')
        
        