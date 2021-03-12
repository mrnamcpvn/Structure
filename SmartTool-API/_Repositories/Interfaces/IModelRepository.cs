using System.Threading.Tasks;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IModelRepository : IMainRepository<Model, int>
    {
        Task<Model> GetByFactoryAndModelNo(string facID, string modelNo);
    }
}