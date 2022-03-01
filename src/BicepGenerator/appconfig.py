import os
from dotenv import load_dotenv
load_dotenv()

class AppConfig:
    azstorageConnString: str = ''
    azstorageBicepContainer: str = ''
    authKey: str = ''

    def __init__(self) -> None:
        self.azstorageConnString = os.environ.get('AZSTORAGE_CONN_STRING')
        self.azstorageBicepContainer = os.environ.get('BICEP_AZSTORAGE_CONTAINER')
        self.authKey = os.environ.get('AUTH_KEY')