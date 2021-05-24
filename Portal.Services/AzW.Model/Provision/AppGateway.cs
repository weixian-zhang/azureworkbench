
using System.Collections.Generic;

namespace AzW.Model
 {
     public class AppGateway : Resource
     {
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public int NumberofInstances { get; set; } = 1;
          public bool WAFEnabled { get; set; } = false;
          public string FrontendListenerName { get; set; }
          public string RoutingRuleName { get; set; }
          public int FrontendPort { get; set; }
          public int BackendPort { get; set; }
          public string BackendPoolName { get; set; }
          public string[] LoadBalanceToExistingVMNames { get; set; }
     }
 }