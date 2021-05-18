using System.Threading.Tasks;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IModelOperationRepository : IMainRepository<ModelOperation>
    {
         Task<ModelOperation> GetByModelOperation(ModelOperationEditParam modelParam);
    }
}