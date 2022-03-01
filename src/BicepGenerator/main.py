# TODO:
    # mq module
        # receive bicep-gen command
        # send bicep-gen-event
    
    # bicep generate
        # jinja2 template
        # each resource a new template
        # see how to merge template



from appconfig import AppConfig
from flask import Flask, request, Response

app = Flask(__name__)

appconfig = AppConfig()

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

    authrHeader = request.headers['Authorization']

    if not authrHeader.startswith('AuthKey '):
        return Response('Not authorized', 401)

    authrSplitted = authrHeader.split(' ')

    authKey = authrSplitted[1]

    if not appconfig.authKey == authKey:
        return Response('Not authorized', 401)



# if __name__ == '__main__':
#     run()

