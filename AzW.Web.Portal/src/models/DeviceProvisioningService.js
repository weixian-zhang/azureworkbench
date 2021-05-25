import ResourceType from './ResourceType'
export default class DeviceProvisioningService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DeviceProvisioningService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DeviceProvisioningService(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}