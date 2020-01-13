using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface IDiagramRepository
    {
        Task SaveAnonymousDiagram(AnonyDiagramShareContext context);

        Task<AnonyDiagramShareContext> GetSharedDiagramAsync(string diagramId);
    }
}