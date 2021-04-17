using System.Threading.Tasks;
using SmartTooling_API.Helpers;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IEfficiencyRepository : IMainRepository<Efficiency>
    {
        Task<bool> CheckExists(ModelEfficiencyEditParam editParam);
    }
}