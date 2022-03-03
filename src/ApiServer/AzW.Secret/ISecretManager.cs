using System;

namespace AzW.Secret
{
    public interface ISecretManager
    {
        T GetSecret<T>() where T : class;
    }
}
