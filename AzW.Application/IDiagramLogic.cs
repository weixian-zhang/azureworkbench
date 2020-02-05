using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Application
{
    public interface IDiagramLogic
    {
        Task<string> GenerateShareLinkForAnonyDiagramAsync(AnonyDiagramShareContext context);

        Task<AnonyDiagramShareContext> GetSharedDiagramAsync(string anonymousDiagramId);

    }
}