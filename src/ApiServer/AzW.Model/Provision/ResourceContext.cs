using System.Collections.Generic;

namespace AzW.Model
{
    public class ResourceContext
    {
        public bool UseResourceGroupLocation { get; set; }
        public List<Resource> Resources { get; set; }
    }
}