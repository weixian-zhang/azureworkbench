import ResourceType from './ResourceType'
export default class DataLakeStorage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataLakeStorage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataLakeStorage(),
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