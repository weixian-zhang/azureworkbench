import ResourceType from './ResourceType'
export default class ServiceEndpoint
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ServiceEndpoint(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ServiceEndpoint(),
            ServiceEndpointTargetServices: [
                {
                    displayName: 'Azure ActiveDirectory',
                    resourceName: 'Microsoft.AzureActiveDirectory',
                    isSelected: false
                }, 
                {
                    displayName: 'Azure Storage',
                    resourceName: 'Microsoft.Storage',
                    isSelected: false
                }, 
                {
                    displayName: 'Azure SQL',
                    resourceName: 'Microsoft.Sql',
                    isSelected: false
                },
                {
                    displayName: 'Cognitive Services',
                    resourceName: 'Microsoft.CognitiveServices',
                    isSelected: false
                },
                {
                    displayName: 'Key Vault',
                    resourceName: 'Microsoft.KeyVault',
                    isSelected: false
                },
                {
                    displayName: 'Service Bus',
                    resourceName: 'Microsoft.ServiceBus',
                    isSelected: false
                }, 
                {
                    displayName: 'Event Hub',
                    resourceName: 'Microsoft.EventHub',
                    isSelected: false
                },
                {
                    displayName: 'App Service',
                    resourceName: 'Microsoft.Web',
                    isSelected: false
                }
            ]
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}