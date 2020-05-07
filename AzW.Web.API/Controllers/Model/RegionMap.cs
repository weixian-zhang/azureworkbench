using System.Collections.Generic;

namespace AzW.Web.API
{
    public class RegionMap
    {
        public string DisplayName { get; set; }
        public string  ProvisionName { get; set; }
        public string RatecardMeterRegionName { get; set; }
        public bool NoPricingFromRatecard { get; set; } = false;
    }
}