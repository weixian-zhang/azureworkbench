using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.ResourceManager.Models;

namespace AzW.Application
{
    public class AzureInfoService : IAzureInfoService
    {
        public AzureInfoService(IAzArmService azArmSvc)
        {
            _azArmSvc = azArmSvc;
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
           var subs = await _azArmSvc.GetSubscriptions();

           var azSubs = ObjectMapper.Mapper.Map
            <IEnumerable<Subscription>, IEnumerable<AzSubscription>>(subs);

            return azSubs;
        }

        private IAzArmService _azArmSvc;
    }
}