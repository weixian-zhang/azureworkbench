import Resource from './Resource';

export default class VM extends Resource
{
    constructor() {
        super(null);
        this.Name = '';
        this.spec = {
            SKU: '',
            Dependencies: {
                PublicIP: '',
                Subnet: '',
                VirtualNetwork: '',
                Zone: '',
                Tags: []
            }
            
        };
 }
}