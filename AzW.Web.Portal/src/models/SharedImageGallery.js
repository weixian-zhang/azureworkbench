import ResourceType from './ResourceType'
export default class SharedImageGallery
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.SharedImageGallery(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.SharedImageGallery(),
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