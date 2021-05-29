
namespace AzW.Model
 {
     public class WebApp : Resource
     {
         public string Location { get; set; }
         public string ResourceGroupName { get; set; }
         public string PlanName { get; set; }
         public bool IsLinux { get; set; }
         public string AppInsightsName { get; set; }
         public string LogAnalyticsWorkspaceName { get; set; }
         public string PricingTier { get; set;}
         public int NumberOfInstance { get; set; } = 1;

     }
 }