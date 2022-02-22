
using System.Collections.Generic;

namespace AzW.Model
 {
     public class NSGRule: Resource
     {
          public string Direction { get; set; } //"in", "out"
          public bool Allow { get; set; }
          public string FromAddresses { get; set; }
          public string FromPorts { get; set; }
          public string ToAddresses { get; set; }
          public string ToPorts { get; set; }
          public string Protocol { get; set; } //tcp, udp, icmp, *
          public int Priority { get; set; }
     }
 }