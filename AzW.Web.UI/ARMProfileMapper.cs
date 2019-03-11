using AutoMapper;
using AzW.Model.Designer;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzW.Web.UI
{
    public class ARMProfileMapper : Profile
    {
        public ARMProfileMapper()
        {
            CreateMap<ISubscription, AzSubscription>();

            CreateMap<IResourceGroup, AzResourceGroup>();
        }
    }
}
