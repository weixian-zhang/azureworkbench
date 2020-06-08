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
            Name: '',
            Location: '',
            ResourceGroupName: '',

            VNetName: '',
            SubnetName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}