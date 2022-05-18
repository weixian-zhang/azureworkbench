import ResourceType from './ResourceType'
export default class Subscription
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Subscription(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Subscription(),
            Name: 'Azure',
            ManagementGroup: ''
        };
    }
}