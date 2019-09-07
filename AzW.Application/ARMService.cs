using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AzW.Dto;
using Microsoft.Azure.Management;
using Microsoft.Azure.Management.ResourceManager;

namespace AzW.Application
{
    public class ARMService : IARMService
    {
        public ARMService(IMapper mapper)
        {  
            _mapper = mapper;
        }

        public IEnumerable<AzResourceGroup> GetResourceGroups()
        {
            //HttpClient c = new HttpClient(new HttpClientHandler({Credentials = new Credentials});
            ISubscriptionClient subClient = new SubscriptionClient(null);
        
           return null;
        }

        public IEnumerable<AzSubscription> GetSubscriptions()
        {
            return null;
        }

        private SignInContext _signinContext;
        private readonly IMapper _mapper;
    }
}
