import ResourceType from './ResourceType'
export default class DigitalTwins
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DigitalTwins(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DigitalTwins(),
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