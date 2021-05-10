import ResourceType from './ResourceType'
export default class Image
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.Image(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.Image(),
            Name: '',
            Location: '',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}