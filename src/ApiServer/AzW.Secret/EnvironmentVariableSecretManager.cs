using System;
using System.ComponentModel;

namespace AzW.Secret
{
    public class EnvironmentVariableSecretManager : ISecretManager
    {
        public T GetSecret<T>() where T : class
        {
           var secret = Activator.CreateInstance(typeof(T));
           PropertyDescriptorCollection props = TypeDescriptor.GetProperties(secret);

           foreach (PropertyDescriptor pd in props)
           {
               string envSecret = Environment.GetEnvironmentVariable(pd.Name);

                pd.SetValue(secret, envSecret);
           };
           
           return (T)secret;
        }
    }
}