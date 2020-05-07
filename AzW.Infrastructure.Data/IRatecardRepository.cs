using System.Collections.Generic;
using System.Threading.Tasks;
using AzW.Model;

namespace AzW.Infrastructure.Data
{
    public interface IRatecardRepository
    {
        Task InsertRatecardsAsync(IEnumerable<Ratecard> ratecards);

        Task<bool> IsRatecardExist();
    }
}