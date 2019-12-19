import Resource from './Resource';

export class VM extends Resource
{
    constructor() {
        super(null);
        this.Name = '';
        this.spec = {
            SKU: '',
            Dependencies: {
                PublicIP: '',
                Subnet: '',
                VirtualNetwork: ''
            }
            
        };
 }
}