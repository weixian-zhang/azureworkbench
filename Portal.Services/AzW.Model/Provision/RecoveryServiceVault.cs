namespace AzW.Model
 {
     public class RecoveryServiceVault : Resource
     {
         public string Location { get; set; }
         public string ResourceGroupName { get; set; }
         public string[] VMNamesToBackup { get; set; }
     }
 }