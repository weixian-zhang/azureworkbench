using System;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace AzW.Model
 {
     public class AnonyDiagramShareContext
     {
         [JsonIgnore]
         public ObjectId Id { get; set; }
         public string UID { get; set; }
         public string DiagramName { get; set; }
         public string DiagramXml { get; set; }
         public string SharedLink { get; set; }
         public DateTime DateTimeSaved { get; set; }
     }
 }