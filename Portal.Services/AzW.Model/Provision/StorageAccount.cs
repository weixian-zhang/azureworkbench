
namespace AzW.Model
 {
     public class StorageAccount : Resource
     {
         public string Location { get; set; }
         public string ResourceGroupName { get; set; }
         public string SkuName { get; set; }
     }
 }