using System;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace AzW.Model
 {
     public class QuickstartDiagramContext
     {
         [JsonIgnore]
         public ObjectId Id { get; set; }
         public string Category { get; set; }
         public string Name { get; set; }
         public string DiagramXml { get; set; }
     }
 }