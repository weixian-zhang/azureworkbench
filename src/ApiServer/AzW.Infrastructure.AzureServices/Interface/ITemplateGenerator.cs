
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.AzureServices
{
    public interface ITemplateGenerator
    {
        public Task<string> Generate(DiagramInfo diagraminfo);
    }
}