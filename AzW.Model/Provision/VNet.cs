
using System.Collections.Generic;

namespace AzW.Model
 {
     public class VNet : ResourceBase
     {
         public string AddressSpace { get; set; }
         public List<Subnet> Subnets { get; set; }
     }
 }