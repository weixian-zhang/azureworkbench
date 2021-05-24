
using System.Collections.Generic;

namespace AzW.Model
 {
     public class VM : Resource
     {
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string AddressSpace { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public bool HasPublicIP { get; set; }
          public string PublicIPName { get; set; }

          public string VMPublisher { get; set; }
          public string VMOffer { get; set; }
          public string VMSKU { get; set; }
          public string VMVersion { get; set; }
          public string AdminUsername { get; set; }
          public string AdminPassword { get; set; }
          public string SizeName { get; set; }
          public bool IsLinux { get; set; }
     }
 }