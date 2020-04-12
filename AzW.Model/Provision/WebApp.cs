
namespace AzW.Model
 {
     public class WebApp
     {
         public string Name { get; set; }
         public string Location { get; set; }
         public string ResourceGroupName { get; set; }
         public string PlanName { get; set; }
         public bool IsLinux { get; set; }
         public string PricingTier { get; set; }
         public string RuntimeStack { get; set; }
  
     }
 }