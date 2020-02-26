export default class ResourceType
{
    static WindowsVM() {return 'vmWindows'; }
    static LinuxVM() {return 'vmLinux'; }
    static VM() {return 'vm'; }
    static VMSS() {return 'vmss'; }
    static AppService() {return 'appsvc'; }
    static ASE() {return 'ase'; }
    static Function() {return 'func'; }
    static VNet() {return 'vnet'; }
    static Subnet() {return 'subnet'; }
    static NLB() {return 'nlb'; }
    static AppGw() {return 'appgw'; }
    static DNSPrivateZone() {return 'dnsprivatezone'; }
    static AzureSearch() {return 'search'; }
    static SignalR() {return 'signalr'; }
    static AppServiceCert() {return 'appsvccert'; }
    static AppServiceDomain() {return 'appsvcdomain'; }
    static SharedImageGallery() {return 'sig'; }
    static FrontDoor() {return 'frontdoor'; }
}