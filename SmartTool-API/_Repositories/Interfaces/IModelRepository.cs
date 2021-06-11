using System.Threading.Tasks;
using SmartTool_API._Repositories.Interfaces;
using SmartTool_API.Models;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IModelRepository : IMainRepository<Modell>
    {
        Task<Modell> GetByFactoryAndModelNo(string facID, string modelNo);
    }
}