using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model
{
    public class VMSize
    {
        public string Name { get; set; }
        public string QueryName { get; set; }
        public int MemoryInMB { get; set; }
        public int NumberOfCores { get; set; }
        public int MaxNoOfDataDisks { get; set; }
    }
}
