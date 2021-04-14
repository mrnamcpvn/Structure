using System.Threading.Tasks;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IModelRepository : IMainRepository<Model>
    {
        Task<Model> GetByFactoryAndModelNo(string facID, string modelNo);
    }
}