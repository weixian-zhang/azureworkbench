namespace AzW.Model
{
    public class Ratecard
    {
        public string MeterRegion { get; set; }
        public string MeterCategory { get;set; }
        public string MeterSubCategory { get; set; }
        public string MeterName { get; set; }
        public double MeterRate { get; set; }
        public string Unit { get; set; }
        public double UnitValue { get; set; }
        public string UnitName { get; set; }
    }
}