import os
from loguru import logger

class AppConfig:
    azstorageConnString: str = ''
    azstorageBicepContainer: str = ''
    authKey: str = ''
    messageBrokerConnString: str = ''
    bicepGenCmdQueueName: str = ''
    
    AZSTORAGE_CONN_STRING = 'AZSTORAGE_CONN_STRING'
    BICEP_AZSTORAGE_CONTAINER = 'BICEP_AZSTORAGE_CONTAINER'
    AZURE_SERVICE_BUS_CONN_STRING = 'AZURE_SERVICE_BUS_CONN_STRING'
    BICEP_GEN_COMMAND_QUEUE_NAME = 'BICEP_GEN_COMMAND_QUEUE_NAME'
    COMPRESS_MSG = 'COMPRESS_MSG'

    def __init__(self) -> None:
        
        self.load_fromdotenv()
        
        self.azstorageConnString = os.environ.get(AppConfig.AZSTORAGE_CONN_STRING)
        self.BicepAzStorageContainer = os.environ.get(AppConfig.BICEP_AZSTORAGE_CONTAINER)
        self.messageBrokerConnString = os.environ.get(AppConfig.AZURE_SERVICE_BUS_CONN_STRING)
        self.bicepGenCmdQueueName = os.environ.get(AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME)
        self.compressMessage = os.environ.get(AppConfig.COMPRESS_MSG)
        
    def load_fromdotenv(self) -> None:
        if os.path.exists('.env'):
            with open('.env') as file:
                content = file.readlines();
                for keyval in content:
                                        
                    ok, envKey, envValue = self.get_keyval_from_dotenv(keyval)
                    
                    if ok:
                        match envKey:
                            case AppConfig.AZSTORAGE_CONN_STRING:
                                os.environ[AppConfig.AZSTORAGE_CONN_STRING] = envValue
                            case AppConfig.BICEP_AZSTORAGE_CONTAINER:
                                os.environ[AppConfig.BICEP_AZSTORAGE_CONTAINER] = envValue
                            case AppConfig.AZURE_SERVICE_BUS_CONN_STRING:
                                os.environ[AppConfig.AZURE_SERVICE_BUS_CONN_STRING] = envValue
                            case AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME:
                                os.environ[AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME] = envValue
                            case AppConfig.COMPRESS_MSG:
                                os.environ[AppConfig.COMPRESS_MSG] = envValue
    
    def get_keyval_from_dotenv(self, kv: str):
        
        replaceConstExpr = '__REPLACE__'
        
        if not kv:
            return False, '', ''
        
        envContent = list(kv.replace(' ', '').replace('\n', ''))
        
        firstIndexOfEqual = envContent.index('=')
        
        envContent[firstIndexOfEqual] = replaceConstExpr
        
        keyval =  "".join(envContent).split(replaceConstExpr)
        
        if len(keyval) == 2:
            return True, keyval[0], keyval[1]
        
        return False, '', ''
    