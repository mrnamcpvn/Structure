using System.Threading.Tasks;
using SmartTool_API.Helpers;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IModelOperationRepository : IMainRepository<Model_Operation, int>
    {
        Task<Model_Operation> GetByModelOperation(ModelOperationEditParam modelParam);
    }
}