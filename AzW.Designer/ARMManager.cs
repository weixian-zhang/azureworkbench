using AzW.Model;
using AzW.Model.Designer;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;
using Microsoft.Rest;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.Azure.Management.Fluent.Azure;

namespace AzW.Designer
{
    public class ARMManager : IARMManager
    {
        public ARMManager(IAzure azure)
        {
            _azure = azure;
        }

        public IEnumerable<ISubscription> GetSubscriptions()
        {
            return _azure.Subscriptions.List();
        }

        public IEnumerable<IResourceGroup> GetResourceGroups()
        {
            return _azure.ResourceGroups.List();
        }

        public IEnumerable<string> GetRegions()
        {
            var regions = new List<string>();

           foreach(var r in Region.Values)
            {
                regions.Add(r.Name);
            }

            return regions;
        }

        public async Task<IEnumerable<VMImage>> GetVMImagesAsync(string region)
        {
            //TODO: get from cache

            var vmImages = new List<VMImage>();

            var publishers = await _azure.VirtualMachineImages.Publishers.ListByRegionAsync(region);

            foreach (var publisher in publishers)
            {

                foreach (var offer in publisher.Offers.List())
                {
                    foreach (var sku in offer.Skus.List())
                    {
                        foreach (var image in sku.Images.List())
                        {
                            vmImages.Add(new VMImage()
                            {
                                Publisher = publisher.Name,
                                Offer = offer.Name,
                                Sku = sku.Name,
                                Version = image.Version
                            });
                        }
                    }
                }
            }

            return vmImages;
        }

        private IAzure _azure;
    }
}
