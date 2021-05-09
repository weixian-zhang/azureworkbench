import ResourceType from './ResourceType'
export default class OnPremiseDataGateway
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.OnPremDataGateway(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.OnPremDataGateway(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}