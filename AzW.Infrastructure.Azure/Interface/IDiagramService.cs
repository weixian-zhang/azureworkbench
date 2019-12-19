using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Azure
{
    public interface IDiagramService
    {
        Task GetDiagram(string diagramId);

        Task SaveDiagram(DiagramContext diagramContext);
    }
}