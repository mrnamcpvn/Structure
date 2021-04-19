using System.Threading.Tasks;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IEfficiencyRepository : IMainRepository<Efficiency>
    {
         Task<bool> CheckExists (ModelEfficiencyEditParam editParam);
    }
}