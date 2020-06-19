import ResourceType from './ResourceType'
export default class MediaService
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.MediaService(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.MediaService(),
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