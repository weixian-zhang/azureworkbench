namespace AzW.Model
 {
     public class RecoveryServiceVault
     {
         public string Name { get; set; }
         public string Location { get; set; }
         public string ResourceGroupName { get; set; }
         public string[] VMNamesToBackup { get; set; }
     }
 }