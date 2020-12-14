using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using ByteSizeLib;
using shortid;

namespace AzW.Infrastructure.Data
{
    public class BlobStorageManager
    {
        const string DiagramContainerName = "diagrams";
        const string SharedDiagramContainerName = "shareddiagrams";
        const string QuickstartContainerName = "quickstarts";
        const string MySpaceSharedDiagrams = "myspace-shareddiagrams";

        public BlobStorageManager(string connString)
        {
            _blobClient = new BlobServiceClient(connString);
            _diagContainer = _blobClient.GetBlobContainerClient(DiagramContainerName);
            _sharedLinkContainer = _blobClient.GetBlobContainerClient(SharedDiagramContainerName);
            _quickstartContainer = _blobClient.GetBlobContainerClient(QuickstartContainerName);
            _sharedLinkContainer = _blobClient.GetBlobContainerClient(SharedDiagramContainerName);
            _sharedDiagramMySpace = _blobClient.GetBlobContainerClient(MySpaceSharedDiagrams);
            
            CreateContainersIfNotExist().GetAwaiter().GetResult();
        }

        public async Task SaveSharedLinkDiagram(string sharelinkId, string diagram)
        {
            string blobName = sharelinkId + ".azwb";

            var bc = _sharedLinkContainer.GetBlobClient(sharelinkId);

            byte[] byteArray = Encoding.ASCII.GetBytes(diagram);
            using(var ms = new MemoryStream(byteArray))
            {
                await bc.UploadAsync(ms);
            }
        }

        public async Task<string> GetSharedLinkDiagram(string sharelinkId)
        {
            var bc = _sharedLinkContainer.GetBlobClient(sharelinkId);

            string diagramBase64 = await GetDiagramFromBlobStream(bc);

            return diagramBase64;
        }

        #region Shared diagram in MySpace

        public async Task<string> GetSharedDiagramFromMySpace(string sharedDiagramUID)
        {
            string blobname = GetBlobNameForMySpaceSharedDiagram(sharedDiagramUID);

            var bc = _sharedDiagramMySpace.GetBlobClient(blobname);

            string diagram = await GetDiagramFromBlobStream(bc);

            return diagram;
        }

        public async Task SaveSharedDiagramInMySpace
            (string emailId, string sharelinkId, string diagram)
        {
            string fullBlobName =GetBlobNameForMySpaceSharedDiagram(sharelinkId);

            
            var bc = _sharedDiagramMySpace.GetBlobClient(fullBlobName);
            
            byte[] byteArray = Encoding.ASCII.GetBytes(diagram);
            using(var ms = new MemoryStream(byteArray))
            {
                await bc.UploadAsync(ms, true);
            }

            var metadata = new Dictionary<string,string>();
            metadata.Add("user", emailId);
            bc.SetMetadata(metadata);
        }

        public async Task<bool> DeleteSharedDiagramFromMySpace(string emailId, string diagramUID)
        {
            string blobName = GetBlobNameForMySpaceSharedDiagram(diagramUID);

            var bc = _sharedDiagramMySpace.GetBlobClient(blobName);

            if(! await bc.ExistsAsync())
                return false;

            return await bc.DeleteIfExistsAsync(DeleteSnapshotsOption.None);
        }

        #endregion


        public async Task<string> GetDiagramFromMySpace(string emailId, string collection, string diagramName)
        {
            string blobname = GetBlobName(emailId, collection, diagramName);

            var bc = _diagContainer.GetBlobClient(blobname);

            string diagram = await GetDiagramFromBlobStream(bc);

            return diagram;
        }

        public async Task<string> GetQuickstartDiagram(string category, string name)
        {
            string directory = category + "/";
            string blobName = name + ".azwb";
            string fullBlobPath = directory + blobName;

            var blobClient = _quickstartContainer.GetBlobClient(fullBlobPath);

            if(! await blobClient.ExistsAsync())
                return "";

            using (var ms = new MemoryStream())
            {
                await blobClient.DownloadToAsync(ms);

                byte[] result = ms.ToArray();

                string diagramBase64 = Encoding.UTF8.GetString(result);

                return diagramBase64;
            }
        }

        public async Task SaveDiagramToMySpace
            (string diagram, string emailId, string collection, string diagramName)
        {
           string blobname = GetBlobName(emailId, collection, diagramName);

            try
            {
                var bc = _diagContainer.GetBlobClient(blobname);

                byte[] byteArray = Encoding.ASCII.GetBytes(diagram);
                using(var ms = new MemoryStream(byteArray))
                {
                    await bc.UploadAsync(ms,true);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteDiagramFromMySpace
            (string emailId, string collection, string diagramName)
        {
            string blobName = GetBlobName(emailId, collection, diagramName);

            var bc = _diagContainer.GetBlobClient(blobName);

            if(! await bc.ExistsAsync())
                return true;

            return await bc.DeleteIfExistsAsync(DeleteSnapshotsOption.None);
        }

        public async Task<double> GetBlobSizeInMB(string emailId, string collection, string diagramName)
        {
           string blobName = GetBlobName(emailId, collection, diagramName);

           var blob = _diagContainer.GetBlobClient(blobName);

           var props = await blob.GetPropertiesAsync();

           double sizeBytes = props.Value.ContentLength;

           var size = new ByteSize(sizeBytes);

           return Math.Round(size.MegaBytes, 2);
        }

        private async Task<string> GetDiagramFromBlobStream(BlobClient blob)
        {
            if(!await blob.ExistsAsync())
                return "";
            

            using (var ms = new MemoryStream())
            {
                await blob.DownloadToAsync(ms);

                byte[] result = ms.ToArray();

                string diagramBase64 = Encoding.UTF8.GetString(result);

                return diagramBase64;
            }
        }

        private string GetBlobName(string emailId, string collection, string diagramName)
        {
            string directoryName = GenerateDirectoryName(emailId);

            string blobName = collection + "_" + diagramName + ".azwb";

            string fullPath = directoryName + "/" + blobName;

            return fullPath;
        }

        private string GetBlobNameForMySpaceSharedDiagram(string sharedlinkId)
        {
            string blobName = sharedlinkId + ".azwb";

            return blobName;
        }

        private async Task CreateContainersIfNotExist()
        {
            await _diagContainer.CreateIfNotExistsAsync();
            await _sharedLinkContainer.CreateIfNotExistsAsync();
        }

        private string GenerateDirectoryName(string emailId)
        {
            string directoryName = GetLettersNumbersOnly(emailId);
            return directoryName;
        }

        private string GetLettersNumbersOnly(string emailId)
        {
            string onlyLettersNums =
                new String(emailId.Where(c => Char.IsLetter(c) || Char.IsNumber(c)).ToArray());
            return onlyLettersNums;
        }

        private

        BlobServiceClient _blobClient;
        BlobContainerClient _diagContainer;
        BlobContainerClient _sharedLinkContainer;
        BlobContainerClient _quickstartContainer;

        BlobContainerClient _sharedDiagramMySpace;

    }
}