using Microsoft.Azure.Management.Security;
using Microsoft.Azure.Management.ResourceManager;
namespace AzW.Infrastructure.Azure
{
    public interface IAzureClient
    {
        void SetCurrentSubscriptionId(string subscriptionId);

        ISubscriptionClient SubscriptionManager { get; set; }

        ISecurityCenterClient SecurityCenterClient { get; set; }
    }
}