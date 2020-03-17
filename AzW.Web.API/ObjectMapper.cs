using AutoMapper;
using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;

namespace AzW.Web.API
{
    public static class ObjectMapper
    {
        public static IMapper Mapper
        {
            get
            {
                return _mapper;
            }
        }
        static ObjectMapper()
        {
           _mapper = CreateMap();
        }
        
        private static IMapper CreateMap()
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<ISubscription, AzSubscription>();
                cfg.CreateMap<IResourceGroup, AzResourceGroup>();
            });

            return config.CreateMapper();
        }

        private static IMapper _mapper;
    }
}