
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
using System.Text;
using System.IO.Compression;

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
            string bicepBlobClaimCheckId = GenerateClaimCheckId();
            diagraminfo.BlobClaimCheckFileIdentifier = bicepBlobClaimCheckId;

            diagraminfo.BlobFilePath = GetBicepFullBlobPath(bicepBlobClaimCheckId, diagraminfo.UserEmail);
            diagraminfo.UserDirectory = GetUserBicepBlobDirectory(diagraminfo.UserEmail);

            _logger.Information($"Infrastructure.AzureServices.PyBicepGenerator: sending bicep generation command to pybicep service for user {diagraminfo.UserEmail}");

            await SendBicepGenCommand(diagraminfo);

            _logger.Information($"Infrastructure.AzureServices.PyBicepGenerator: sending bicep generation command sent to pybicep service successfully for user {diagraminfo.UserEmail}");

            return GetBicepBlobUrl(diagraminfo.BlobFilePath);
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

                if(_secret.CompressMessage)
                    msgJson = GZipBase64Message(msgJson);

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
        //https://strgworkbenchdev.blob.core.windows.net/myspace-bicep/{username}/{blobclaimcheckid}/bicep_{claimcheck}.bicep?{sas token}
        private string GetBicepBlobUrl(string blobFilePath)
        {
             string url = _blobManager.GenerateSasToken(blobFilePath);
             return url;
        }

        private string GenerateClaimCheckId()
        {
            return DateTime.Now.ToString("ddMMyyyy-HHmmss");;
        }

        private string GetBicepFullBlobPath(string blobClaimCheckId, string userEmail)
        {
            var baseUrl = new Uri(_secret.BicepBlobStorageUrl);
            string userDir = GetUserBicepBlobDirectory(userEmail);
            string bicepFileName = $"bicep_{blobClaimCheckId}.bicep";
            
            string fullBlobPath = $"{userDir}/{blobClaimCheckId}/{bicepFileName}";

            return fullBlobPath;
        }

        private string GetUserBicepBlobDirectory(string userEmail)
        {
            string onlyLettersNums =
                new String(userEmail.Where(c => Char.IsLetter(c) || Char.IsNumber(c)).ToArray());
            return onlyLettersNums;
        }

        //Returns a compressed Json string in Base64 format
        private string GZipBase64Message(string message)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(message);
 
            using (var outputStream = new MemoryStream())
            {
                using (var gZipStream = new GZipStream(outputStream, CompressionMode.Compress))
                    gZipStream.Write(inputBytes, 0, inputBytes.Length);
            
                var outputBytes = outputStream.ToArray();
            
                //var outputCompressedStr = Encoding.UTF8.GetString(outputBytes);

                return Convert.ToBase64String(outputBytes);
            }
        }
    }
}
