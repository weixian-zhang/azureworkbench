from flask import Flask, request, Response
from appconfig import AppConfig

app: Flask = None
appconfig : AppConfig = None

def init(config: AppConfig, flaskApp: Flask) -> None:
    global appconfig
    appconfig = config

    global app
    app = flaskApp


@app.route('/api/bicepgen', methods=['POST'])
def bicep_gen():

    eg = '''
        {
            "useremail": "",
            "blobClaimCheckFileIdentifier": "11122022-141055",
            "azcontexts": [
                {
                    "ResourceType": "AzureStorage",
                    "": ""
                },
                {
                    "ResourceType": "VirtualMachine",
                    "": ""
                }
            ]
        }
    '''
    
    if request.method == 'POST':
        return 'POST received!'

#auth before requets: https://stackoverflow.com/questions/51691730/flask-middleware-for-specific-route
@app.before_request
def authn_hook():
    authr: str = ''
    authr = request.headers['Authorization']

    if not authr.startswith('AuthKey '):
        return Response('Not authorized', 401)

    authrSplitted = authr.split(' ')

    authKey = authrSplitted[1]

    if not appconfig.authKey == authKey:
        return Response('Not authorized', 401)

def run():
    app.run(debug=True)
    
# class WebApi:

#     def __init__(self, appconfig: AppConfig) -> None:
#         self.appconfig = appconfig
#         self.app = Flask(__name__)
    

#     @app.route('/api/bicepgen', methods=['POST'])
#     def bicep_gen():

#         eg = '''
#             {
#                 "useremail": "",
#                 "blobClaimCheckFileIdentifier": "11122022-141055",
#                 "azcontexts": [
#                     {
#                         "ResourceType": "AzureStorage",
#                         "": ""
#                     },
#                     {
#                         "ResourceType": "VirtualMachine",
#                         "": ""
#                     }
#                 ]
#             }
#         '''
        
#         if request.method == 'POST':
#             return 'POST received!'

#     #auth before requets: https://stackoverflow.com/questions/51691730/flask-middleware-for-specific-route
#     @app.before_request
#     def authn_hook(self):
#         authr: str = ''
#         authr = request.headers.get['Authorization']

#         if not authr.startswith('Shared '):
#             return Response('Not authorized', 401)

#         authrSplitted = authr.split(' ')

#         authKey = authrSplitted[1]

#         if not self.appconfig.authKey == authKey:
#             return Response('Not authorized', 401)

#     def run(self):
#         self.app.run(debug=True)

    
            

    