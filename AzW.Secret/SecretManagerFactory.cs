using System;

namespace AzW.Secret
{
    public class SecretManagerFactory
    {
        public static ISecretManager Create()
        {
            string env = Environment.GetEnvironmentVariable("env");

            if(env == "dev")
                return new DoNetCoreSecretManager();
            else
                return new AppSvcSettingsSecretManager();
        }
    }
}