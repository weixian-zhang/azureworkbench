from ast import Bytes
from azure.servicebus import ServiceBusClient, ServiceBusReceivedMessage
from appconfig import  AppConfig
import base64
import gzip
from abc import abstractmethod

class MessageBroker:
    @abstractmethod
    def receive_bicep_generation_command(self) -> str:
        """handles receving of messages from message broker, deserialize if necessary and return message as str"""
        pass

class AzureServiceBusBroker(MessageBroker):
    
    def __init__(self, appconfig: AppConfig):
        self.appconfig = appconfig
        
        asb = ServiceBusClient.from_connection_string(conn_str=self.appconfig.messageBrokerConnString)
        self.asbReceiver = asb.get_queue_receiver(queue_name=self.appconfig.bicepGenCmdQueueName)
        
        
    def receive_bicep_generation_command(self) -> str:
        
        try:
            received_msgs = self.asbReceiver.receive_messages(max_message_count=1, max_wait_time=5)
        
            if len(received_msgs) == 0:
                return False, ''
            
            asbMsg: ServiceBusReceivedMessage = received_msgs[0]
            
            msgStr = str(asbMsg)
            
            if self.appconfig.compressMessage:
                msgStr = self.decompress_message(msgStr)
            
            self.asbReceiver.complete_message(asbMsg)
            
            return True, msgStr
        
        except Exception as ex:
            #TODO
           print(ex)
        
    
    def decompress_message(self, msg: str) -> str:
        
        gzipBytes = base64.b64decode(msg)
        
        if not self.is_gzip_compressed(gzipBytes):
            return msg
        
        decompressed = gzip.decompress(gzipBytes)
        
        return decompressed.decode('utf-8')
    
    def is_gzip_compressed(self, bytes: Bytes):
        
        if bytes[:2] == b'\x1f\x8b':
            return True
        
        return False
        
        
        

                
        
        