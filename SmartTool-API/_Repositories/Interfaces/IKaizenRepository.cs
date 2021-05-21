using System.Threading.Tasks;
using SmartTool_API.DTO;
using SmartTool_API.Models;

namespace SmartTool_API._Repositories.Interfaces
{
    public interface IKaizenRepository : IMainRepository<Kaizen>
    {
        Task<bool> CheckExistsKaizen(ModelOperationDTO operation);

        Task<bool> CheckKaizenDescriptionExist(KaizenDTO model);
    }
}