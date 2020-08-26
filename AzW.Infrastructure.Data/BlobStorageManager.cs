using System;
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

        public BlobStorageManager(string connString)
        {
            _blobClient = new BlobServiceClient(connString);
            _diagContainer = _blobClient.GetBlobContainerClient(DiagramContainerName);
            _sharedLinkContainer = _blobClient.GetBlobContainerClient(SharedDiagramContainerName);

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


        public async Task<string> GetDiagramFromMySpace(string emailId, string collection, string diagramName)
        {
            string blobname = GetBlobName(emailId, collection, diagramName);

            var bc = _diagContainer.GetBlobClient(blobname);

            string diagram = await GetDiagramFromBlobStream(bc);

            return diagram;
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


    }
}