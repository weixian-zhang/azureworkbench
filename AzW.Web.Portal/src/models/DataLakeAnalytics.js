import ResourceType from './ResourceType'
export default class DataLakeAnalytics
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataLakeAnalytics(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataLakeAnalytics(),
            Deployable: true,
            HighCost: false,
            
            Name: '',
            Location: '',
            Tags: [],
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}