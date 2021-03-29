using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenRepository : IMainRepository<Kaizen, string>
    {
         Task<bool> CheckExistsKaizen(ModelOperationDTO operationDTO);

        Task<bool> CheckKaizenDescriptionExist(KaizenDTO kaizenDTO);
    }
}