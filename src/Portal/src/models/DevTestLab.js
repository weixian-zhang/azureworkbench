import ResourceType from './ResourceType'
export default class DevTestLab
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DevTestLab(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DevTestLab(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}