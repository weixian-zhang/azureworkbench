using System;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace AzW.Model
 {
     public class SharedDiagramMySpaceUpdateContext
     {
         [JsonIgnore]
         public ObjectId Id { get; set; }
         public string EmailId { get; set; }
         public string DiagramUID { get; set; }
         public string DiagramJson { get; set; }
         public DateTime DateTimeSaved { get; set; } = DateTime.Now;
     }
 }