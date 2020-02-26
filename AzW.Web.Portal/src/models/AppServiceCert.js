import ResourceType from './ResourceType'
export default class AppServiceCert
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.AppServiceCert(),
            DisplayName: ''
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.AppServiceCert(),
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