using System.Threading.Tasks;
using SmartTool_API.DTOs;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenRepository : IMainRepository<Kaizen>
    {
        Task<bool> CheckExistsKaizen(Model_OperationDTO operation);
        Task<bool> CheckKaizenDescriptionExist(KaizenDTO kaizen);
    }
}