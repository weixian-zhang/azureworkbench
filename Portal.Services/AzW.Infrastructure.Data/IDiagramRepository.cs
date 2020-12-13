using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface IDiagramRepository
    {
        Task<DiagramSaveResult> SaveAnonymousDiagram(AnonyDiagramShareContext context);

        Task<AnonyDiagramShareContext> GetAnonymousDiagramAsync(string diagramId);

        Task<DiagramSaveResult> SaveDiagramToWorkspace(WorkspaceDiagramContext context);

        Task<IEnumerable<SharedDiagramMySpaceInfo>> GetAllSharedDiagramsFromMySpace(string emailId);

        Task<DiagramSaveResult> SaveSharedDiagramInMySpace(SharedDiagramMySpaceContext context);

        Task<string> LoadSharedDiagramFromMySpace(string diagramUID);

        Task<DiagramSaveResult> UpdateSharedDiagramInMySpace(string emailId, string diagramUID, string diagramJson);

        Task<IEnumerable<string>> GetCollectionFromWorkspaceAsync(string emailId);

        Task<IEnumerable<WorkspaceDiagramContextResult>> GetDiagramsFromWorkspace(string emailId);

        Task<QuickstartDiagramContext> GetQuickstartDiagramContext(string category, string name);

        Task<string> LoadDiagramFromWorkspace
            (string emailId, string collectionName, string UID);

        Task<bool> deleteDiagramFromWorkspace
            (string emailId, string collectionName, string UID);
    }
}