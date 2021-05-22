namespace AzW.Model
 {
     public class ASE : Resource
     {
          public string Name { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string VNetName { get; set; }
          public string SubnetName { get; set; }
          public bool IsInternalASE { get; set; }
     }
 }