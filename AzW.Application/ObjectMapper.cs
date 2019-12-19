using AutoMapper;
using AzW.Model;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Models;

public static class ObjectMapper
{
    public static IMapper Mapper
    {
        get
        {
            return AutoMapper.Mapper.Instance;
        }
    }
    static ObjectMapper()
    {
        CreateMap();
    }
    
    private static void CreateMap()
    {
        AutoMapper.Mapper.Initialize(cfg =>
        {
            cfg.CreateMap<ISubscription, AzSubscription>();
        });
    }
}