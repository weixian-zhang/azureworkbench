using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model
{
    public class ProvisionContext
    {
        public string SubscriptionId { get; set; }

        public string SubscriptionName { get; set; }

        public string ResourceGroupName { get; set; }

        public string Location { get; set; }
    }
}
