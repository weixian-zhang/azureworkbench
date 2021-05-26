import ResourceType from './ResourceType'
export default class VNetPeering
{
    constructor (){
        this.GraphModel = {
            Id: '',
            ResourceType: ResourceType.VNetPeering(),
            DisplayName: '',
            SubnetsAndCidrs: []
        };

        this.ProvisionContext = {
            ResourceType: ResourceType.VNetPeering(),

            LocalVNetName: '',
            RemoteVNetName: '',
            RemoteVnetRGName: ''
        };
        this.CalculatorContext = {
            IsFree: true,
            Tier: ''
        }
    }
}