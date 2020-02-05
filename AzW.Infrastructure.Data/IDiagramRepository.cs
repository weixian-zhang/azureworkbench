using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface IDiagramRepository
    {
        Task SaveAnonymousDiagram(AnonyDiagramShareContext context);

        Task<AnonyDiagramShareContext> GetSharedDiagramAsync(string diagramId);

        Task SaveDiagramToWorkspace(WorkspaceDiagramContext context);

        Task<IEnumerable<string>> GetCollectionFromWorkspaceAsync(string emailId);

        Task<IEnumerable<WorkspaceDiagramContextResult>> GetDiagramsFromWorkspace(string emailId);

        Task<string> LoadDiagramFromWorkspace
            (string emailId, string collectionName, string UID);

        Task<bool> deleteDiagramFromWorkspace
            (string emailId, string collectionName, string UID);
    }
}