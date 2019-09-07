using System;

namespace AzW.Secret
{
    public interface ISecretManager
    {
        AzSecret GetSecret();
    }
}
