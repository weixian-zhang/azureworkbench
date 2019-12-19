using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;

namespace AzW.Application
{
    public class ResourceManagerLogic : IAzureInfoService
    {
        public ResourceManagerLogic(IResourceManagerService azRscManager)
        {
            _azRscManager = azRscManager;
        }

        public Task<IEnumerable<AzLocation>> GetLocations()
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<AzResourceGroup>> GetResourceGroups()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<AzSubscription>> GetSubscriptions()
        {
           var subs = await _azRscManager.GetSubscriptions();

           var azSubs = ObjectMapper.Mapper.Map
            <IEnumerable<ISubscription>, IEnumerable<AzSubscription>>(subs);

            return azSubs;
        }

        private IResourceManagerService _azRscManager;
    }
}