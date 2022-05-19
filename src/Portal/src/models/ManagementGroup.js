import ResourceType from './ResourceType'
export default class ManagementGroup
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ManagementGroup(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ManagementGroup(),
            Name: 'platform',
            ParentName: '',
            SubscriptionNames: []
        };
    }
}