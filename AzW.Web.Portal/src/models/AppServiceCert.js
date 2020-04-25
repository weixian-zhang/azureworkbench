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