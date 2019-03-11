using AzW.Model;
using Microsoft.Azure.Management.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent;
using Microsoft.Azure.Management.ResourceManager.Fluent.Authentication;
using Microsoft.Rest;
using System;
using System.Collections.Generic;
using System.Text;
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

        private IAzure _azure;
    }
}
