using System.Collections.Generic;

namespace AzW.Job.CacheHydrator
{
    public class RateCardPayload
    {
        public List<object> OfferTerms { get; set; }
        public List<RatecardResource> Meters { get; set; }
        public string Currency { get; set; }
        public string Locale { get; set; }
        public string RatingDate { get; set; }
        public bool IsTaxIncluded { get; set; }
    }
}