
namespace AzW.Model
 {
     public class PublicIP : Resource
     {
         public string Location { get; set; }
         public bool Static { get; set; } = false;
     }
 }