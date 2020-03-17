using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Infrastructure.AzureServices;
using AzW.Model;
using AzW.Secret;
using Microsoft.Azure.Management.Compute.Fluent.Models;
using Microsoft.Azure.Management.ResourceManager.Fluent.Core;

namespace AzW.Infrastructure.AzureServices
{
    public class ComputeInfoService : BaseService, IComputeInfoService
    {
        public ComputeInfoService(string accessToken, WorkbenchSecret secret) : base(accessToken, secret)
        {
            
        }

        public IEnumerable<VMImage> GetImageReferences(string subscription)
        {
            var publishers = AzClient.WithSubscription(subscription)
                .VirtualMachineImages.Publishers.ListByRegion(Region.AsiaSouthEast);
            
            var vmImages = new List<VMImage>();

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
    }
}