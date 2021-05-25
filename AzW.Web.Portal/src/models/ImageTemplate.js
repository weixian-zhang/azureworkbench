import ResourceType from './ResourceType'
export default class ImageTemplate
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.ImageTemplate(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.ImageTemplate(),
            Name: '',
            Location: 'westus',
            ResourceGroupName: ''
        };
        this.CalculatorContext = {
            IsFree: false,
            Tier: ''
        }
    }
}