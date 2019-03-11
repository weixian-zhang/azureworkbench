using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using AzW.Designer;
using AzW.Model;
using AzW.Model.Designer;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;

namespace AzW.Application
{
    public class ARMService : IARMService
    {
        public ARMService(IARMManager armManager, IMapper mapper)
        {  
            _armManager = armManager;
            _mapper = mapper;
        }

        public IEnumerable<AzResourceGroup> GetResourceGroups()
        {
           IEnumerable<IResourceGroup> irscgroups = _armManager.GetResourceGroups();

            var rgList = _mapper.Map<List<AzResourceGroup>>(irscgroups);

            return rgList;
        }

        public IEnumerable<AzSubscription> GetSubscriptions()
        {
            var isubscriptions = _armManager.GetSubscriptions();

            var subscriptionList = _mapper.Map<List<AzSubscription>>(isubscriptions);

            return subscriptionList;
        }

        public IEnumerable<string> GetLocations()
        {
           var result = PSManager.ExecuteCmdlet("Get-AzureRmLocation");

            return null;
        }

        private IAzure _azure;
        private IARMManager _armManager;
        private SignInContext _signinContext;
        private readonly IMapper _mapper;
    }
}
