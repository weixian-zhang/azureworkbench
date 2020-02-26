import ResourceType from './ResourceType'
export default class FrontDoor
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.FrontDoor(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.FrontDoor(),
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