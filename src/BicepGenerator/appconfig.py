import os
from loguru import logger

class AppConfig(object):
    
    AZSTORAGE_CONN_STRING = 'AZSTORAGE_CONN_STRING'
    BICEP_AZSTORAGE_CONTAINER = 'BICEP_AZSTORAGE_CONTAINER'
    AZURE_SERVICE_BUS_CONN_STRING = 'AZURE_SERVICE_BUS_CONN_STRING'
    BICEP_GEN_COMMAND_QUEUE_NAME = 'BICEP_GEN_COMMAND_QUEUE_NAME'
    COMPRESS_MSG = 'COMPRESS_MSG'
    
    @logger.catch
    def __init__(self):
        
        self.load_fromdotenv()
        
        self.azstorageConnString = os.environ.get(AppConfig.AZSTORAGE_CONN_STRING)
        self.azstorageBicepContainer = os.environ.get(AppConfig.BICEP_AZSTORAGE_CONTAINER)
        self.messageBrokerConnString = os.environ.get(AppConfig.AZURE_SERVICE_BUS_CONN_STRING)
        self.bicepGenCmdQueueName = os.environ.get(AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME)
        self.compressMessage = os.environ.get(AppConfig.COMPRESS_MSG)
        
        logger.info(f'env vars loaded {AppConfig.AZSTORAGE_CONN_STRING}={self.azstorageConnString}, \
            {AppConfig.BICEP_AZSTORAGE_CONTAINER}={self.azstorageBicepContainer}, \
            {AppConfig.AZURE_SERVICE_BUS_CONN_STRING}={self.messageBrokerConnString}, \
            {AppConfig.BICEP_GEN_COMMAND_QUEUE_NAME}={self.bicepGenCmdQueueName}, \
            {AppConfig.COMPRESS_MSG}={self.compressMessage}')
    
    @logger.catch
    def load_fromdotenv(self) -> None:
        if os.path.exists('.env'):
            
            logger.info('.env found, loading env vars from .env')
            with open('.env') as file:
                
                content = file.readlines();
                logger.info(f'.env content {content}')
                
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
                                
        else:
            logger.info('.env not found, loading end vars from hosted platform')
    
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
    