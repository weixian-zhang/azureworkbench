import os

class AppConfig:
    azstorageConnString: str = ''
    azstorageBicepContainer: str = ''
    authKey: str = ''
    messageBrokerConnString: str = ''
    bicepGenCmdQueueName: str = ''
    
    AZSTORAGE_CONN_STRING = 'AZSTORAGE_CONN_STRING'
    BICEP_AZSTORAGE_CONTAINER = 'BICEP_AZSTORAGE_CONTAINER'
    AUTH_KEY = 'AUTH_KEY'
    AZURE_SERVICE_BUS_CONN_STRING = 'AZURE_SERVICE_BUS_CONN_STRING'
    BICEP_GEN_COMMAND_QUEUE_NAME = 'BICEP_GEN_COMMAND_QUEUE_NAME'
    COMPRESS_MSG = 'COMPRESS_MSG'

    def __init__(self) -> None:
        
        if self.load_fromdotenv():
            return
        
        self.azstorageConnString = os.environ.get('AZSTORAGE_CONN_STRING')
        self.BicepAzStorageContainer = os.environ.get('BICEP_AZSTORAGE_CONTAINER')
        self.authKey = os.environ.get('AUTH_KEY')
        self.messageBrokerConnString = os.environ.get('AZURE_SERVICE_BUS_CONN_STRING')
        self.bicepGenCmdQueueName = os.environ.get('BICEP_GEN_COMMAND_QUEUE_NAME')
        self.compressMessage = os.environ.get('COMPRESS_MSG')
        
    def load_fromdotenv(self) -> bool:
        if os.path.exists('.env'):
            with open('.env') as file:
                content = file.readlines();
                for keyval in content:
                    
                    keyvalArray = keyval.strip().split('=')
                    
                    ok, envKey, envValue = self.get_keyval_from_dotenv(keyval)
                    
                    if ok:
                        match envKey:
                            case AppConfig.AZSTORAGE_CONN_STRING:
                                self.azstorageConnString = envValue
                            case AppConfig.BICEP_AZSTORAGE_CONTAINER:
                                self.BicepAzStorageContainer = envValue
                            case AppConfig.AUTH_KEY:
                                self.authKey = envValue
                            case AppConfig.AZURE_SERVICE_BUS_CONN_STRING:
                                self.messageBrokerConnString = envValue
                            case AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME:
                                self.bicepGenCmdQueueName = envValue
                            case AppConfig.COMPRESS_MSG:
                                self.compressMessage = envValue
            return True
        
        return False
    
    def get_keyval_from_dotenv(self, kv: str):
        
        replaceConstExpr = '__TBREPLACE__'
        
        envContent = list(kv.replace(' ', '').replace('\n', ''))
        
        firstIndexOfEqual = envContent.index('=')
        
        envContent[firstIndexOfEqual] = replaceConstExpr
        
        keyval =  "".join(envContent).split(replaceConstExpr)
        
        if len(keyval) == 2:
            return True, keyval[0], keyval[1]
        
        return False, '', ''
    