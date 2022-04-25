using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.AzureServices
{
    public interface IDiagramService
    {
        Task GetDiagram(string diagramId);

        Task SaveDiagram(DiagramContext diagramContext);
    }
}