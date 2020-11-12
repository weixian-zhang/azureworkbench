using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model
{
    public class VMImage
    {
        public string DisplayName { get; set; }
        public string SearchPattern { get; set; }
        
        public string Publisher { get; set; }

        public string Offer { get; set; }

        public string Sku { get; set; }

        public string Version { get; set; }
    }
}
