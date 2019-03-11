using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model.Designer
{
    public class ResourceIcon
    {
        public string ResourceIconId { get; set; }
        public int X { get; set; }

        public int Y { get; set; }

        public int LabelX { get; set; }

        public int LabelY { get; set; }

        public string ResourceType { get; set; }

        public ResourceContext ResourceContext { get; set; }
    }
}
