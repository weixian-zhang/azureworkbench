import ResourceType from './ResourceType'
export default class ASE
{
    constructor (){
        this.GraphModel = {
            ResourceType: ResourceType.ASE(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            Name: '',
            Location: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}