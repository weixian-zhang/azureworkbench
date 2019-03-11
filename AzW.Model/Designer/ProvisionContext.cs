using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model.Designer
{
    public class ProvisionContext
    {
        public string SubscriptionId { get; set; }

        public string SubscriptionName { get; set; }

        public string ResourceGroupName { get; set; }

        public IEnumerable<ResourceIcon> ResourceIcons { get; set; }
    }
}
