
using System.Collections.Generic;

namespace AzW.Model
 {
     public class VNetPeering : Resource
     {
          public string LocalVNetName { get; set; }
          public string RemoteVNetName { get; set; }
     }
 }