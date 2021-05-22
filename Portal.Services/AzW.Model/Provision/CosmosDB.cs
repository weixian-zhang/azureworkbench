
using System.Collections.Generic;

namespace AzW.Model
 {
     public class CosmosDB : Resource
     {
          public string Name { get; set; }
          public string Location { get; set; }
          public string ResourceGroupName { get; set; }
          public string CosmosDBType { get; set; }
     }

     public enum CosmosDBType
     {
         Cassandra,
         Gremlin,
         SQL,
         Mongo
     }
 }