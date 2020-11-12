using System;
using System.ComponentModel;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace AzW.Secret
{
    public class DoNetCoreSecretManager : ISecretManager
    {
        public static IConfigurationRoot Configuration { get; set; }
        
        public T GetSecret<T>() where T : class
        {
            var builder = new ConfigurationBuilder();
            builder.AddUserSecrets<T>();
            Configuration = builder.Build();

            var secret = Activator.CreateInstance(typeof(T));
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(secret);

            foreach (PropertyDescriptor pd in props)
            {
               string envSecret = Configuration[pd.Name];

                pd.SetValue(secret, envSecret);
            };

            return (T)secret;
        }
    }
}