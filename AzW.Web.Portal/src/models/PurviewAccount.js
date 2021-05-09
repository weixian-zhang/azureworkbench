import ResourceType from './ResourceType'
export default class PurviewAccount
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.PurviewAccount(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.PurviewAccount(),
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