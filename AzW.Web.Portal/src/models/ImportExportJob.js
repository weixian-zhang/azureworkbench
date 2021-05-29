import ResourceType from './ResourceType'
export default class ImportExportJob
{
    constructor (){

        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ImportExportJob(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ImportExportJob(),
            Deployable: true,
            HighCost: false,

            Name: '',
            Location: 'westus',
            Tags: []
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}