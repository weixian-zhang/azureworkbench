from azure.servicebus import ServiceBusClient, ServiceBusReceivedMessage
from appconfig import  AppConfig
import base64
import gzip

class MsgBroker:
    
    def __init__(self, appconfig: AppConfig):
        self.appconfig = appconfig
        
        asb = ServiceBusClient.from_connection_string(conn_str=self.appconfig.messageBrokerConnString)
        self.asbReceiver = asb.get_queue_receiver(queue_name=self.appconfig.bicepGenCmdQueueName)
        
        
    def receive_bicep_gen_action(self):
        
        received_msgs = self.asbReceiver.receive_messages(max_message_count=1, max_wait_time=5)
        
        if len(received_msgs) == 0:
            return
         
        asbMsg: ServiceBusReceivedMessage = received_msgs[0]
        
        msgStr = str(asbMsg)
        
        if self.appconfig.compressMessage:
            msgStr = self.decompress_message(msgStr)
        
        
        #TODO: log
        print(msgStr)
        
        self.asbReceiver.complete_message(asbMsg)
        
        return True
    
    def decompress_message(self, msg: str):
        
        gzipBytes = base64.b64decode(msg)
        
        decompressed = gzip.decompress(gzipBytes)
        
        return str(decompressed)
        
        
        

                
        
        