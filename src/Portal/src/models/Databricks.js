import ResourceType from './ResourceType'
export default class Databricks
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Databricks(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Databricks(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: [],
            InVNet: false,
            PublicSubnetName: '',
            PublicSubnetCidr: '',
            PrivateSubnetName: '',
            PrivateSubnetCidr: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}