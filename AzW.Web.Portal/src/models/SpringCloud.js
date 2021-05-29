import ResourceType from './ResourceType'
export default class SpringCloud
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SpringCloud(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SpringCloud(),
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