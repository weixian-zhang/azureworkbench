import ResourceType from './ResourceType'
export default class APIM
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.APIM(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.APIM(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],

            VNetAddress: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}