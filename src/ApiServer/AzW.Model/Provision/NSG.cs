
using System.Collections.Generic;

namespace AzW.Model
 {
     public class NSG : Resource
     {
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public IEnumerable<NSGRule> InboundRules { get; set; } = new List<NSGRule>();
          public IEnumerable<NSGRule> OutboundRules { get; set; } = new List<NSGRule>();

     }
 }