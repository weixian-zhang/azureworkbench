using System;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace AzW.Model
 {
     public class SharedDiagramMySpaceInfo
     {
         [JsonIgnore]
         public ObjectId Id { get; set; }
         public string EmailId { get; set; }
         public string UID { get; set; }
         public string DiagramName { get; set; }
         //always empty as diagram is in blob storage
         public string DiagramXml { get; set; }
         public string SharedLink { get; set; }
         public DateTime DateTimeSaved { get; set; }
     }
 }