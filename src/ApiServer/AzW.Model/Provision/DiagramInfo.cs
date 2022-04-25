
using Newtonsoft.Json;

namespace AzW.Model
 {
    public class DiagramInfo
    {
        public string UserEmail { get; set; }

        public string UserDirectory { get; set; }

        public string BlobClaimCheckFileIdentifier { get; set; }

        public string BlobFilePath { get; set; }

        [JsonProperty("diagramContext")]
        public DiagramContexts DiagramContext { get; set; }
    }

    //to avoid existing name class, to refactor
    public class DiagramContexts
    {
        [JsonProperty("globalContext")]
        public GlobalContext GlobalContext { get; set; }

        [JsonProperty("azcontexts")]
        public dynamic[] AzContexts { get; set; }
    }

    public class GlobalContext
    {
        [JsonProperty("location")]
        public string Location { get; set; }

        [JsonProperty("tags")]
        public Tag[] Tags { get; set; }
    }

    public class Tag
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public string Value { get; set; }
    }
 } 