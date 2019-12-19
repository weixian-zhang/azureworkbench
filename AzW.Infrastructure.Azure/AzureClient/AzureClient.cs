using Microsoft.Azure.Management.ResourceManager;
using Microsoft.Azure.Management.Security;

namespace AzW.Infrastructure.Azure
{
    public sealed class AzureClient : IAzureClient
    {
        public ISubscriptionClient SubscriptionManager { get; set;}

        public ISecurityCenterClient SecurityCenterClient { get; set;}

        public void SetCurrentSubscriptionId(string subscriptionId)
        {
            _currentSubscriptionId = subscriptionId;

            SecurityCenterClient.SubscriptionId = _currentSubscriptionId;
        }

        private string _currentSubscriptionId = string.Empty;
    }
}