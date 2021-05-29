using System.Collections.Generic;

namespace AzW.Model
{
     public class AppInsights : Resource
     {
          public string LogAnalyticsWorkspaceName { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
     }
 }