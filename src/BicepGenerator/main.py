# TODO:
    # mq module
        # receive bicep-gen command
        # send bicep-gen-event
    
    # bicep generate
        # jinja2 template
        # each resource a new template
        # see how to merge template
        
import asyncio
from appconfig import AppConfig
from bicepgen import BicepGenerator
from flask import Flask, request, Response
import time
from contexts import DiagramInfo
from bicepgen import BicepGenerator
from messaging import MessageBroker, AzureServiceBusBroker
import json

#app = Flask(__name__)

appconfig = AppConfig()
bicepGenerator = BicepGenerator()
msgBroker: MessageBroker = AzureServiceBusBroker(appconfig)

def run():
    
    while True:
        
        #this function itself waits for 5secs for messages
        #additional sleep not required in while
        ok, diagramInfoJson = msgBroker.receive_bicep_generation_command()
        
        if not ok:
            continue
        
        diagramInfoObj = json.loads(diagramInfoJson, object_hook=DiagramInfo)
        
        bicep = bicepGenerator.generate(diagramInfoObj)
        
        time.sleep(1)

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
