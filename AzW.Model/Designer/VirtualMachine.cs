using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Model.Designer
{
    public class VirtualMachine : ResourceContext
    {
        public Region Region { get; set; }

        public string Name { get; set; }

        public bool IsNewNetwork { get; set; }

        public string NewNetworkAddressSpace { get; set; }

        public bool IsNewPublicIP { get; set; }

        public bool IsWithoutPublicIP { get; set; }

        public string NewPrimaryPublicIP { get; set; }

        public bool IsStaticPrivateIP { get; set; }

        public string AdminUserName { get; set; }

        public string AdminPassword { get; set; }

        public bool IsWindows { get; set; }



    }
}
