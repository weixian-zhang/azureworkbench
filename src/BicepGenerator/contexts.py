
class DiagramInfo:
    
    def __init__( self, dict ):

        self.useremail : str = ''
        self.blobClaimCheckFileIdentifier : str = ''
        self.azcontexts = None
        self.globalContext = None

        vars(self).update( dict )
    

class AzContext:
    Name: str = ''
    Location: str = 'westus'

class StorageAccount(AzContext):
    SkuName: str = ''


diagramContextSample = '''
        {
            "useremail": "weixzha@microsoft.com",
            "blobClaimCheckFileIdentifier": "11122022-141055",
            "diagramContext": {
                "globalContext": {
                    "location": "southeastasia",
                    "tags": [
                        {
                            "key": "app",
                            "value": "web tier"
                        }
                    ]
                },
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
        }
    '''