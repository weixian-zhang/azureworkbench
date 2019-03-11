using System;
using System.Collections.Generic;
using System.Text;

namespace AzW.Application
{
    public class ComputeInfoService : IComputeInfoService
    {
        public IEnumerable<string> GetLocations()
        {
            var result = PSManager.ExecuteCmdlet("Get-AzLocation");

            return null;
        }
    }
}
