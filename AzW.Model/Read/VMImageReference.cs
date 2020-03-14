using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model
{
    public class VMImageReference
    {
        public string Publisher { get; set; }

        public string Offer { get; set; }

        public string Sku { get; set; }

        public string Version { get; set; }
    }
}
