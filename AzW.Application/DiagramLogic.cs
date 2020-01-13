using System;
using System.Threading.Tasks;
using AzW.Infrastructure.Data;
using AzW.Model;
using AzW.Secret;
using Microsoft.AspNetCore.WebUtilities;

namespace AzW.Application
{
    public class DiagramLogic : IDiagramLogic
    {
        public DiagramLogic(IDiagramRepository diagramRepo, WorkbenchSecret secret)
        {
            _diagramRepo = diagramRepo;
            _secret = secret;
        }

        public async Task<string> GenerateShareLinkForAnonyDiagramAsync
            (AnonyDiagramShareContext context)
        {
            string shortUUID = Convert.ToBase64String(Guid.NewGuid().ToByteArray());
            
            string shareLink =
                QueryHelpers.AddQueryString(_secret.PortalUrl + "shareanonydia", "id", shortUUID);
            
            context.UID = shortUUID;
            context.SharedLink = shareLink; 
            
            await _diagramRepo.SaveAnonymousDiagram(context);

            return shareLink;
        }

        public async Task<AnonyDiagramShareContext> GetSharedDiagramAsync(string anonymousDiagramId)
        {
            return await _diagramRepo.GetSharedDiagramAsync(anonymousDiagramId);
        }

        public Task SaveDiagram()
        {
            throw new System.NotImplementedException();
        }

        private IDiagramRepository _diagramRepo;
        private WorkbenchSecret _secret;
    }
}