from appconfig import AppConfig
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from loguru import logger

class AzStorage:
    
    def __init__(self, appconfig: AppConfig) -> None:
       self.appconfig = appconfig
       
    
    def write_blob(self, containerName: str, blobFullPath: str, data: str) -> bool:
        
       try:
           
            blobClient =  BlobClient.from_connection_string(conn_str=self.appconfig.azstorageConnString, \
                container_name=containerName, blob_name=blobFullPath)

            blobClient.upload_blob(data)
            
            return True
        
       except Exception as e:
           logger.exception(e)
           return False
       
       
  