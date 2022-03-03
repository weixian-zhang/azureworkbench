namespace AzW.Model
 {
     public class Function : Resource
     {
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public bool IsConsumptionPlan { get; set; }
          public bool IsLinux { get; set; }
          public string PricingTier { get; set; }
     }
 }