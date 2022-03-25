
from appconfig import AppConfig
from bicepgen import BicepGenerator
import time
import json
from multiprocessing import Process, Value
from flask import Flask

appconfig = AppConfig()

from contexts import DiagramInfo
from bicepgen import BicepGenerator
from messaging import MessageBroker, AzureServiceBusBroker
from azstorage import AzStorage

webapp = Flask(__name__)
msgBroker: MessageBroker = AzureServiceBusBroker(appconfig)
azstorage: AzStorage = AzStorage(appconfig)

def run():
    
    process = Process(target=listen_to_bicepgen_commands)
    process.start() # start listen_to_bicepgen_commands in new process
    
    webapp.run(host='0.0.0.0', port=3000)
    
    process.join()
    
@webapp.route('/')
def get_health_state():
    return 'alive'
        
def listen_to_bicepgen_commands():
    while True:
        
        #this function itself waits for 5secs for messages
        #additional sleep not required in while
        ok, diagramInfoJson = msgBroker.receive_bicep_generation_command()
        
        if not ok:
            continue
        
        diagramInfo = json.loads(diagramInfoJson, object_hook=DiagramInfo)
        
        bicepGenerator = BicepGenerator()
        bicep = bicepGenerator.generate(diagramInfo)
        
        write_bicep_to_azstorage(diagramInfo, bicep)
        
        write_diagraminfo_to_azstorage(diagramInfo, diagramInfoJson)
        
        time.sleep(0.5)
       
def write_bicep_to_azstorage(diagramInfo: DiagramInfo, bicep: str):
    
    azstorage.write_blob(containerName=appconfig.BicepAzStorageContainer, \
        blobFullPath=diagramInfo.BlobFilePath, data=bicep)
    
def write_diagraminfo_to_azstorage(diagramInfo: DiagramInfo, data: str):
    
    blobPath = f'{diagramInfo.UserDirectory}/{diagramInfo.BlobClaimCheckFileIdentifier}/diagraminfo_{diagramInfo.BlobClaimCheckFileIdentifier}.txt'
    
    azstorage.write_blob(containerName=appconfig.BicepAzStorageContainer, \
        blobFullPath=blobPath, data=data)
    

if __name__ == '__main__':
    run()















# @app.route('/api/bicepgen', methods=['POST'])
# def bicep_gen():

#     body = request.data

#     diagram = json.loads(body, object_hook=DiagramInfo)

#     bicep = bicepgenerator.build_template(diagram)
#     print(bicep)
    
#     response = app.response_class(response=json.dumps(bicep), status=200, mimetype='application/json')
    
#     return response

# @app.before_request
# def authn_hook():

#     authrHeader = request.headers['Authorization']

#     if not authrHeader.startswith('AuthKey '):
#         return Response('Not authorized', 401)

#     authrSplitted = authrHeader.split(' ')

#     authKey = authrSplitted[1]

#     if not appconfig.authKey == authKey:
#         return Response('Not authorized', 401)
