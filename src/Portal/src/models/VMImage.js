import ResourceType from './ResourceType'
export default class VMImage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VMImage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VMImage(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}