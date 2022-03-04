
using System;
using AzW.Model;
using Azure.Messaging.ServiceBus;
using AzW.Secret;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Serilog;
using System.Linq;
using System.IO;
using AzW.Infrastructure.Data;

namespace AzW.Infrastructure.AzureServices
{
    public class PyBicepGenerator : ITemplateGenerator
    {
        private WorkbenchSecret _secret;
        private ServiceBusSender _asbSender;
        private const string BicepGenerateCommandQueue = "bicep-generate-command";
        private ILogger _logger;
        private BlobStorageManager _blobManager;

        public PyBicepGenerator(WorkbenchSecret secret, BlobStorageManager blobManager, ILogger logger)
        {
            _secret = secret;
            _logger = logger;
            _blobManager = blobManager;
        }

        //The string is a Url to bicep blob file in Azure Storage
        public async Task<string> Generate(DiagramInfo diagraminfo)
        {
            //file identifier for client portal to download Bicep file
            string bicepBlobClaimCheckId = DateTime.Now.ToString("ddMMyyyy-hhmmss");

            diagraminfo.BlobClaimCheckFileIdentifier = bicepBlobClaimCheckId;

            await SendBicepGenCommand(diagraminfo);

            return GetBicepBlobUrl(bicepBlobClaimCheckId, diagraminfo.UserEmail);
        }

        private async Task SendBicepGenCommand(DiagramInfo diagraminfo)
        {
            try
            {
                if(_asbSender == null)
                {
                    var asb = new ServiceBusClient(_secret.ServiceBusConnString);
                    _asbSender = asb.CreateSender(BicepGenerateCommandQueue);
                }
                
                string msgJson = JsonConvert.SerializeObject(diagraminfo);

                await _asbSender.SendMessageAsync(new ServiceBusMessage(msgJson));

                //TODO: save diargamcontext

                _logger.Information($"Bicep generation command sent for {msgJson}");
            }
            catch(Exception ex)
            {
                _logger.Error(ex.ToString());
                throw ex;
            }
        }

        //Url format example:
        //https://strgworkbenchdev.blob.core.windows.net/myspace-bicep/{username}/{blobclaimcheckid}/bicep_{claimcheck}.bicep
        private string GetBicepBlobUrl(string blobClaimCheckId, string userEmail)
        {
            var baseUrl = new Uri(_secret.BicepBlobStorageUrl);
            string userDir = GetUserBicepBlobDirectory(userEmail);
            string bicepFileName = $"bicep_{blobClaimCheckId}.bicep";
            
            string fullBlobPath = $"{userDir}/{blobClaimCheckId}/{bicepFileName}";

            string url = _blobManager.GenerateSasToken(fullBlobPath);
            
            return url;
        }

        private string GetUserBicepBlobDirectory(string userEmail)
        {
            string onlyLettersNums =
                new String(userEmail.Where(c => Char.IsLetter(c) || Char.IsNumber(c)).ToArray());
            return onlyLettersNums;
        }
    }
}
