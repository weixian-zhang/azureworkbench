
using System.Collections.Generic;

namespace AzW.Model
 {
     public class NLB : Resource
     {
          public string Name { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public bool IsInternalNLB { get; set; }
          public string PublicIPName { get; set; }
          public bool IsStandardSku { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public int FrontendPort { get; set; }
          public string BackendpoolName { get; set; }
          public string LoadBalancingRuleName { get; set; }
          public string[] LoadBalanceToExistingVMNames { get; set; }
     }
 }