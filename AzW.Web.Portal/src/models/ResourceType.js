export default class ResourceType
{
    static WindowsVM() {return 'vmWindows'; }
    static LinuxVM() {return 'vmLinux'; }
    static VMSS() {return 'vmss'; }
    static AppService() {return 'appsvc'; }
    static ASE() {return 'ase'; }
    static Function() {return 'func'; }
    static VNet() {return 'vnet'; }
    static Subnet() {return 'subnet'; }
    static NLB() {return 'nlb'; }
    static AppGw() {return 'appgw'; }
    static DNSPrivateZone() {return 'dnsprivatezone'; }
}