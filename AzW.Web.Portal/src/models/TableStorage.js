import ResourceType from './ResourceType'
export default class TableStorage
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.TableStorage(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.TableStorage(),
            Name: '',
            Location: '',
            ResourceGroupName: '',
            SkuName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}