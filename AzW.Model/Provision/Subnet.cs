
namespace AzW.Model
 {
     public class Subnet
     {
         public string Name { get; set; }
         public string AddressSpace { get; set; }
         public string NSGName { get; set; }

         public string[] ServiceEndpointTargetServices { get; set; }
     }
 }