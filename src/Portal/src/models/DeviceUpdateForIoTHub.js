import ResourceType from './ResourceType'
export default class DeviceUpdateForIoTHub
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DeviceUpdateForIoTHub(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DeviceUpdateForIoTHub(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}