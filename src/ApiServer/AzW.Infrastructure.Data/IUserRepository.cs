using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface IUserRepository
    {
        Task LogUserSignin(UserSigninInfo ui);
    }
}