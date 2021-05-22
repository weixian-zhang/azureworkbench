namespace AzW.Infrastructure.AzureServices
{
    public interface ITemplateGenerator
    {
        public string Generate(dynamic[] azcontexts);
    }
}