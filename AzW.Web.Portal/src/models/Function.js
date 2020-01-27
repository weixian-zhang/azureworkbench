import ResourceType from './ResourceType'
export default class Function
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.Function(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            CIDR: '',
            NSG: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}