namespace AzW.Model
 {
     public class Function
     {
          public string Name { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public bool IsConsumptionPlan { get; set; }
          public bool IsLinux { get; set; }
          public string PricingTier { get; set; }
     }
 }