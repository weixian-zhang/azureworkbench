
using System.Collections.Generic;

namespace AzW.Model
 {
     public class VNet : Resource
     {
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string AddressSpace { get; set; }
         public List<Subnet> Subnets { get; set; }
     }
 }