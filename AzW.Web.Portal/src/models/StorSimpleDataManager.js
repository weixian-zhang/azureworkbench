import ResourceType from './ResourceType'
export default class StorSimpleDataManager
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.StorSimpleDataManager(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.StorSimpleDataManager(),
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