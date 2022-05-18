import ResourceType from './ResourceType'
export default class ResourceGroup
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ResourceGroup(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ResourceGroup(),
            Name: 'rg1',
            Location: 'westus',
            SubscriptionName: ''
        };
    }
}