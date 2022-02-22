using System.IO;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;

namespace AzW.Job.CacheHydrator
{
    public class BlobManager
    {
        const string SystemContainer = "system";

        private BlobServiceClient _blobClient;
        private BlobContainerClient _systemContainer;

        public BlobManager(string connString)
        {
           _blobClient = new BlobServiceClient(connString);
           _systemContainer = _blobClient.GetBlobContainerClient(SystemContainer);
        }

        public async Task<string> GetServiceTagJsonFile(string blobName)
        {
            var blob = _systemContainer.GetBlobClient(blobName);

            using (var ms = new MemoryStream())
            {
                await blob.DownloadToAsync(ms);

                byte[] result = ms.ToArray();

                string jsonStr = Encoding.UTF8.GetString(result);

                return jsonStr;
            }
        }
        
    }
 }