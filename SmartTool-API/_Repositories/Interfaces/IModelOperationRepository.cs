using System.Threading.Tasks;
using SmartTooling_API.Helpers;
using SmartTooling_API.Models;

namespace SmartTooling_API._Repositories.Interfaces
{
    public interface IModelOperationRepository : IMainRepository<Model_Operation>
    {
        Task<Model_Operation> GetByModelOperation(ModelOperationEditParam modelParam);
    }
}