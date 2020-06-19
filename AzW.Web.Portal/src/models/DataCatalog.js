import ResourceType from './ResourceType'
export default class DataCatalog
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.DataCatalog(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.DataCatalog(),
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