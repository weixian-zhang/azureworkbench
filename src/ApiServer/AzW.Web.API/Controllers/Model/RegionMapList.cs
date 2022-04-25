// using System.Collections.Generic;

// namespace AzW.Web.API
// {
//     public class RegionMapList
//     {
//         public static IEnumerable<RegionMap> List()
//         {
//             return new List<RegionMap>()
//             {
                
     
//                 new RegionMap()
//                 {
//                     DisplayName = "US West",
//                     ProvisionName = "uswest",
//                     RatecardMeterRegionName = "US West 2"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Australia SouthEast",
//                     ProvisionName = "australiasoutheast",
//                     RatecardMeterRegionName = "AU Southeast"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Australia Central 2",
//                     ProvisionName = "australiacentral2",
//                     RatecardMeterRegionName = "AU Central 2"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "India Central",
//                     ProvisionName = "indiacentral",
//                     RatecardMeterRegionName = "IN Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "India South",
//                     ProvisionName = "indiasouth",
//                     RatecardMeterRegionName = "IN South"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "India West",
//                     ProvisionName = "indiawest",
//                     RatecardMeterRegionName = "IN West"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Korea South",
//                     ProvisionName = "koreasouth",
//                     RatecardMeterRegionName = "KR South"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Korea Central",
//                     ProvisionName = "koreacentral",
//                     RatecardMeterRegionName = "KR Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "United Arab Emirates Central",
//                     ProvisionName = "uaecentral",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "United Arab Emirates North",
//                     ProvisionName = "uaenorth",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "South Africa North",
//                     ProvisionName = "southafricanorth",
//                     RatecardMeterRegionName = "ZA North"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "South Africa West",
//                     ProvisionName = "southafricawest",
//                     RatecardMeterRegionName = "ZA West"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "China North",
//                     ProvisionName = "chinanorth",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "China North 2",
//                     ProvisionName = "chinanorth2",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "China East 2",
//                     ProvisionName = "chinaeast2",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Germany Central",
//                     ProvisionName = "germanycentral",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Germany North East",
//                     ProvisionName = "germanynortheast",
//                     RatecardMeterRegionName = "US Central",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Virginia",
//                     ProvisionName = "usgovvirgina",
//                     RatecardMeterRegionName = "USGov",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Iowa",
//                     ProvisionName = "usgoviowa",
//                     RatecardMeterRegionName = "USGov",
//                     NoPricingFromRatecard = true
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "",
//                     ProvisionName = "",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Arizona",
//                     ProvisionName = "usgovarizona",
//                     RatecardMeterRegionName = "US Gov AZ"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Texas",
//                     ProvisionName = "usgovtexas",
//                     RatecardMeterRegionName = "US Gov TX"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Dod East",
//                     ProvisionName = "usdodeast",
//                     RatecardMeterRegionName = "US DoD"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Government US Dod Central",
//                     ProvisionName = "usdodcentral",
//                     RatecardMeterRegionName = "US DoD"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Australia East",
//                     ProvisionName = "australiaeast",
//                     RatecardMeterRegionName = "AU East"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Japan West",
//                     ProvisionName = "japanwest",
//                     RatecardMeterRegionName = "JA West"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Australia Central",
//                     ProvisionName = "australiacentral",
//                     RatecardMeterRegionName = "AU Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "SouthEast Asia",
//                     ProvisionName = "southeastasia",
//                     RatecardMeterRegionName = "AP Southeast"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US West 2",
//                     ProvisionName = "westus2",
//                     RatecardMeterRegionName = "US West 2"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US Central",
//                     ProvisionName = "centralus",
//                     RatecardMeterRegionName = "US Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US East",
//                     ProvisionName = "eastus",
//                     RatecardMeterRegionName = "US East"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US East 2",
//                     ProvisionName = "eastus2",
//                     RatecardMeterRegionName = "US East 2"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US North Central",
//                     ProvisionName = "northcentralus",
//                     RatecardMeterRegionName = "US North Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US South Central",
//                     ProvisionName = "southcentralus",
//                     RatecardMeterRegionName = "US South Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "US West Central",
//                     ProvisionName = "westcentralus",
//                     RatecardMeterRegionName = "US West Central"
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Canada Central",
//                     ProvisionName = "canadacentral",
//                     RatecardMeterRegionName = "" //continue future
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Japan East",
//                     ProvisionName = "japaneast",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Brazil South",
//                     ProvisionName = "brazilsouth",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Europe North",
//                     ProvisionName = "northeurope",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Europe West",
//                     ProvisionName = "westeurope",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Canada East",
//                     ProvisionName = "canadaeast",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "UK West",
//                     ProvisionName = "ukwest",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "France Central",
//                     ProvisionName = "francecentral",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "France South",
//                     ProvisionName = "francesouth",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Switzerland North",
//                     ProvisionName = "switzerlandnorth",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Switzerland West",
//                     ProvisionName = "switzerlandwest",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Germany North",
//                     ProvisionName = "germanynorth",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Germany West Central",
//                     ProvisionName = "germanywestcentral",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "NorwayWest",
//                     ProvisionName = "norwaywest",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "Norway East",
//                     ProvisionName = "norwayeast",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "UK South",
//                     ProvisionName = "uksouth",
//                     RatecardMeterRegionName = ""
//                 },
//                 new RegionMap()
//                 {
//                     DisplayName = "East Asia",
//                     ProvisionName = "eastasia",
//                     RatecardMeterRegionName = ""
//                 }
//             };
//         }
//     }
// }